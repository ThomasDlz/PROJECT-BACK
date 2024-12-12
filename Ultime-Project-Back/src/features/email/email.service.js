import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Ou utilisez votre fournisseur SMTP
  auth: {
    user: "your-email@gmail.com", // Remplacez par votre e-mail
    pass: "your-email-password", // Remplacez par votre mot de passe (ou une clé d'application pour Gmail)
  },
});

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "your-email@gmail.com", // Adresse de l'expéditeur
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}: ${error.message}`);
  }
};

export default sendEmail;
