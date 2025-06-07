import type { NextApiRequest, NextApiResponse } from 'next';
import Mailgun from 'mailgun.js';
import formData from 'form-data';

type Data = {
  message: string;
};

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body as ContactFormData;

    console.log(name, email, message, process.env.MAILGUN_API_KEY)
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const mailgun = new Mailgun(formData);
    const mg = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY ?? '',
      url: "https://api.eu.mailgun.net"
    });

    const messageData = {
      from: `Le Lavoir de la Passerelle contact@lelavoir.re`,
      to: 'contact@lelavoir.re',
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    };

    try {
      await mg.messages.create(process.env.MAILGUN_DOMAIN ?? '', messageData);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
