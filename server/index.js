require('dotenv').config();
const express = require("express");
const nodemailer = require('nodemailer');
// const cron = require('node-cron');
const cors = require("cors");
const dayjs = require("dayjs");

const app = express();
app.set('view engine','ejs');
app.use(cors());

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + '/'));

const emailQueue = [];

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.AUTH_MAIL,
    pass: process.env.MAIL_PASS
  }
});

const send = async(recipient, title, time, description, scheduledTime) => {
  var mailOptions = {
      from: process.env.AUTH_MAIL,
      to: recipient,
      subject: `${title} at ${time}`,
      text: description
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);

        const index = emailQueue.findIndex(email => email.scheduledTime.toString()===scheduledTime.toString());
        if (index !== -1) {
          emailQueue.splice(index, 1);
        }
      }
    });
}

// Function to schedule an email
function scheduleEmail(recipient, title, time, description, scheduledTime, mailIndex) {
  const now = new Date();
  const timeDifference = scheduledTime - now;

  if (timeDifference > 0) {
    emailQueue[mailIndex].timer = setTimeout(() => {
      send(recipient, title, time, description, scheduledTime);
    }, timeDifference);
  }else{
    const index = emailQueue.findIndex(email => email.scheduledTime.toString()===scheduledTime.toString());
    if (index !== -1) {
      emailQueue.splice(index, 1);
    }
  }
}


app.get("/",(req,res)=>{
  res.send("Nodemailer");
})

app.post("/",(req,res)=>{

    const date = req.body.date.split('-');
    const time = req.body.time.split(':');
    console.log(date, time);

    const userTime = new Date(date[0], date[1]-1, date[2], time[0], time[1]);
    console.log(userTime);

    // const uid = generateUniqueId();

    // Assuming req.body contains the details of the email to be scheduled
    const newEmail = {
      recipient: req.body.recipient,
      title: req.body.title,
      time: req.body.time,
      description: req.body.description,
      scheduledTime: userTime,
    };

    // Check if an email with the same scheduledTime exists in the queue
    const existingEmailIndex = emailQueue.findIndex(email => email.scheduledTime.toString() === userTime.toString());
    var newMailIndex = null;
    if (existingEmailIndex !== -1) {
      // Update the existing email in the queue
      if (emailQueue[existingEmailIndex].timer) {
        clearTimeout(emailQueue[existingEmailIndex].timer);
      }
      emailQueue[existingEmailIndex] = newEmail;
    } else {
      // Add the new email to the queue
      emailQueue.push(newEmail);
      newMailIndex = emailQueue.findIndex(email => email.scheduledTime.toString() === userTime.toString());
    }
    console.log(emailQueue);


    // Schedule the email to be sent
    scheduleEmail(req.body.recipient, req.body.title, req.body.time, req.body.description, userTime, newMailIndex===null?existingEmailIndex:newMailIndex);
    res.status(200).json({ message: 'Scheduled' });
    
})

app.listen(process.env.PORT || 3001, function(){
  console.log("Server started on port 3001.");

  console.log(emailQueue);

  emailQueue.forEach((email,idx) => {
    const { recipient, title, time, description, scheduledTime } = email;
    scheduleEmail(recipient, title, time, description, scheduledTime, idx);
  });

});
