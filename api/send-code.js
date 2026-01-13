
import Brevo from "@getbrevo/brevo";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ message: "Email and code required" });
  }

  try {
    const brevo = new Brevo.TransactionalEmailsApi();
    brevo.setApiKey(process.env.BREVO_API_KEY);

    await brevo.sendTransacEmail({
      sender: { email: "no-reply@cbsua.edu.ph", name: "CBSUA COE Portal" },
      to: [{ email }],
      subject: "Your CBSUA Verification Code",
      htmlContent: `<p>Your verification code is: <strong>${code}</strong></p>`
    });

    res.status(200).json({ message: "Code sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send code" });
  }
}

