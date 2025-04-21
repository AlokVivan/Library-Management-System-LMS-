// controllers/emailController.js

const sendEmail = async (req, res) => {
    try {
      const { Resend } = await import('resend'); // ✅ dynamic import
      const resend = new Resend('re_fPm8bq85_JLSrWetjRoNFcuHha83oEe3V'); // 🔐 API key
  
      const { to, subject, html } = req.body;
  
      const response = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to,
        subject,
        html,
      });
  
      res.status(200).json({ success: true, response });
    } catch (err) {
      console.error("❌ Email send failed:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  };
  
  module.exports = { sendEmail };
  