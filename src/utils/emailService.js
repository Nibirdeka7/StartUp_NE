import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
// You can also use environment variables
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

/**
 * Send startup approval email
 */
export const sendApprovalEmail = async (toEmail, startupName, startupId, founderName) => {
  try {
    // console.log('📧 Attempting to send approval email via EmailJS...');
    
    const appUrl = import.meta.env.VITE_APP_URL ;
    const updateUrl = `${appUrl}/startup/${startupId}`;
    
    // Prepare template parameters
    const templateParams = {
      to_email: toEmail,
      startup_name: startupName,
      founder_name: founderName || 'Founder',
      update_url: updateUrl,
      app_url: appUrl,
      current_year: new Date().getFullYear(),
      date: new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    // console.log('EmailJS parameters:', {
    //   serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    //   templateId: import.meta.env.VITE_EMAILJS_APPROVAL_TEMPLATE_ID,
    //   toEmail: toEmail
    // });
    
    // Send email using EmailJS
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_APPROVAL_TEMPLATE_ID,
      templateParams
    );

    // console.log('✅ EmailJS approval email sent successfully:', result);
    return { success: true, data: result };
    
  } catch (error) {
    // console.error('❌ EmailJS error:', error);
    
    // Provide user-friendly error messages
    let errorMessage = error.text || error.message || 'Failed to send email';
    
    if (error.text?.includes('Invalid template')) {
      errorMessage = 'Email template not found. Check your template ID.';
    } else if (error.text?.includes('Invalid user')) {
      errorMessage = 'Invalid EmailJS configuration. Check your API keys.';
    } else if (error.text?.includes('Service not found')) {
      errorMessage = 'Email service not found. Check your service ID.';
    }
    
    return { 
      success: false, 
      error: errorMessage,
      details: error.text || error.message
    };
  }
};

/**
 * Send startup rejection email
 */
export const sendRejectionEmail = async (toEmail, startupName, founderName, review, adminComments) => {
  try {
    // console.log('📧 Attempting to send rejection email via EmailJS...');
    
    const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    
    // Prepare template parameters
    const templateParams = {
      to_email: toEmail,
      startup_name: startupName,
      founder_name: founderName || 'Founder',
      review: review || 'Please check our submission guidelines and reapply.',
      admin_comments: adminComments || '',
      app_url: appUrl,
      list_startup_url: `${appUrl}/`,
      current_year: new Date().getFullYear(),
      date: new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    // console.log('EmailJS rejection parameters:', templateParams);
    
    // Send email using EmailJS
    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_REJECTION_TEMPLATE_ID,
      templateParams
    );

    // console.log('✅ EmailJS rejection email sent successfully:', result);
    return { success: true, data: result };
    
  } catch (error) {
    // console.error('❌ EmailJS rejection error:', error);
    
    let errorMessage = error.text || error.message || 'Failed to send rejection email';
    
    return { 
      success: false, 
      error: errorMessage,
      details: error.text || error.message
    };
  }
};

/**
 * Send generic notification email
 */
export const sendNotificationEmail = async (toEmail, subject, message) => {
  try {
    const templateParams = {
      to_email: toEmail,
      subject: subject,
      message: message,
      app_url: import.meta.env.VITE_APP_URL || window.location.origin,
      date: new Date().toLocaleDateString()
    };

    const result = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID, // Create this template
      templateParams
    );

    return { success: true, data: result };
    
  } catch (error) {
    console.error('EmailJS notification error:', error);
    return { 
      success: false, 
      error: error.text || error.message 
    };
  }
};

// Fallback function for development/testing
export const sendMockEmail = (type, toEmail, startupName, startupId, founderName) => {
  console.log(`📧 [MOCK] ${type} email would be sent to:`, toEmail);
  console.log('Startup:', startupName);
  console.log('Founder:', founderName);
  
  if (type === 'approval') {
    const url = `${window.location.origin}/startup/${startupId}`;
    alert(`✅ [MOCK] Approval email would be sent to: ${toEmail}\n\nUpdate URL: ${url}`);
  } else {
    alert(`📧 [MOCK] Rejection email would be sent to: ${toEmail}`);
  }
  
  return { success: true, mock: true };
};

export default {
  sendApprovalEmail,
  sendRejectionEmail,
  sendNotificationEmail,
  sendMockEmail
};