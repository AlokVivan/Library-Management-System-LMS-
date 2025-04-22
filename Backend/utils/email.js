const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

// Welcome email: Sent when a user registers
const sendWelcomeEmail = async (recipientEmail, recipientName) => {
  try {
    const data = await resend.emails.send({
      from: 'LMS Team <onboarding@resend.dev>', // Replace if you verify domain
      to: recipientEmail,
      subject: 'Welcome to the Library!',
      html: `
        <h2>Hi ${recipientName},</h2>
        <p>Welcome to our Library Management System. We're happy to have you with us!</p>
        <p>Explore, borrow, and enjoy reading 📚</p>
      `,
    });
    console.log('✅ Email sent:', data);
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

// Approval email: Sent when admin approves the user
const sendApprovalEmail = async (recipientEmail, recipientName) => {
  try {
    const data = await resend.emails.send({
      from: 'LMS Team <onboarding@resend.dev>',
      to: recipientEmail,
      subject: 'Your account has been approved! 🎉',
      html: `
        <h2>Hi ${recipientName},</h2>
        <p>Great news! Your account on Bookify LMS has been approved by the admin.</p>
        <p>You can now log in and start exploring books, borrowing, and more!</p>
        <p>Welcome aboard! 📚</p>
      `,
    });
    console.log('✅ Approval email sent:', data);
  } catch (error) {
    console.error('❌ Approval email error:', error.message);
  }
};

// Export both functions
module.exports = { sendWelcomeEmail, sendApprovalEmail };
