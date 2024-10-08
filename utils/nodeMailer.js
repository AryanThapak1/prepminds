const nodemailer=require("nodemailer");

const sendEmail=async(options)=>{
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USERNAME,
            pass:process.env.EMAIL_PASSWORD
        }
    });

    const mailOptions={
        email:process.env.EMAIL,
        to:options.email,
        subject:options.subject,
        text:options.text
    }

    await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;