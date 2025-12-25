import { sendApprovalEmail } from '../../utils/emailService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { startupEmail, founderEmail, startupName, startupId } = req.body;

  if (!startupEmail || !startupName || !startupId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const result = await sendApprovalEmail(startupEmail, founderEmail, startupName, startupId);
    
    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Approval email sent successfully' 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        error: result.error 
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to send email' 
    });
  }
}