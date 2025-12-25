// import nodemailer from 'nodemailer';

// // Create reusable transporter object using SMTP transport
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || 'smtp.gmail.com',
//   port: process.env.SMTP_PORT || 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

// // HTML email template for startup approval
// const getApprovalEmailHTML = (startupName, startupId, deadline) => {
//   const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL || 'http://localhost:3000';
//   const dashboardLink = `${websiteUrl}/startup/${startupId}`;

//   return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//       <meta charset="utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Congratulations! Your Startup Has Been Approved</title>
//       <style>
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         body {
//           background-color: #f7fafc;
//           color: #333;
//           line-height: 1.6;
//         }
        
//         .email-container {
//           max-width: 600px;
//           margin: 0 auto;
//           background: white;
//           border-radius: 16px;
//           overflow: hidden;
//           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
//         }
        
//         .header {
//           background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
//           color: white;
//           padding: 40px 30px;
//           text-align: center;
//         }
        
//         .logo {
//           font-size: 28px;
//           font-weight: bold;
//           margin-bottom: 10px;
//           letter-spacing: 1px;
//         }
        
//         .tagline {
//           font-size: 14px;
//           opacity: 0.9;
//           margin-bottom: 20px;
//         }
        
//         .content {
//           padding: 40px 30px;
//         }
        
//         .greeting {
//           font-size: 24px;
//           color: #1a202c;
//           margin-bottom: 20px;
//           font-weight: 600;
//         }
        
//         .message {
//           color: #4a5568;
//           font-size: 16px;
//           margin-bottom: 25px;
//           line-height: 1.8;
//         }
        
//         .highlight-box {
//           background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
//           border-left: 4px solid #dc2626;
//           padding: 20px;
//           border-radius: 8px;
//           margin: 30px 0;
//         }
        
//         .deadline {
//           color: #dc2626;
//           font-weight: bold;
//           font-size: 18px;
//         }
        
//         .dashboard-btn {
//           display: inline-block;
//           background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
//           color: white;
//           padding: 16px 32px;
//           text-decoration: none;
//           border-radius: 50px;
//           font-weight: 600;
//           font-size: 16px;
//           margin: 30px 0;
//           text-align: center;
//           transition: all 0.3s ease;
//           box-shadow: 0 4px 15px rgba(220, 38, 38, 0.2);
//         }
        
//         .dashboard-btn:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 6px 20px rgba(220, 38, 38, 0.3);
//         }
        
//         .link-container {
//           background: #f8fafc;
//           padding: 15px;
//           border-radius: 8px;
//           margin: 20px 0;
//           word-break: break-all;
//           border: 1px dashed #cbd5e0;
//         }
        
//         .link {
//           color: #3182ce;
//           text-decoration: none;
//         }
        
//         .steps {
//           margin: 30px 0;
//         }
        
//         .step {
//           display: flex;
//           align-items: flex-start;
//           margin-bottom: 20px;
//         }
        
//         .step-number {
//           background: #dc2626;
//           color: white;
//           width: 28px;
//           height: 28px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-weight: bold;
//           margin-right: 15px;
//           flex-shrink: 0;
//         }
        
//         .footer {
//           background: #1a202c;
//           color: #cbd5e0;
//           padding: 30px;
//           text-align: center;
//           font-size: 14px;
//         }
        
//         .social-links {
//           margin-top: 20px;
//         }
        
//         .social-icon {
//           color: #cbd5e0;
//           text-decoration: none;
//           margin: 0 10px;
//           display: inline-block;
//         }
        
//         @media (max-width: 600px) {
//           .content, .header {
//             padding: 30px 20px;
//           }
          
//           .greeting {
//             font-size: 22px;
//           }
          
//           .dashboard-btn {
//             display: block;
//             width: 100%;
//             padding: 14px;
//           }
//         }
//       </style>
//     </head>
//     <body>
//       <div class="email-container">
//         <div class="header">
//           <div class="logo">Northeast Startup Hub</div>
//           <div class="tagline">Empowering Innovation in Northeast India</div>
//         </div>
        
//         <div class="content">
//           <h1 class="greeting">Congratulations, ${startupName}!</h1>
          
//           <p class="message">
//             We're thrilled to inform you that your startup application has been reviewed and approved by our team. 
//             Welcome to the Northeast Startup Hub community!
//           </p>
          
//           <div class="highlight-box">
//             <p><strong>Important:</strong> To complete your onboarding and get full access to all platform features, 
//             please complete your startup profile within the next:</p>
//             <p class="deadline">⏰ ${deadline}</p>
//           </div>
          
//           <div class="steps">
//             <div class="step">
//               <div class="step-number">1</div>
//               <div>
//                 <strong>Click the button below</strong> to access your startup dashboard
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">2</div>
//               <div>
//                 <strong>Complete all required information</strong> including team details, funding requirements, and business plan
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">3</div>
//               <div>
//                 <strong>Upload your pitch deck</strong> and other relevant documents
//               </div>
//             </div>
            
//             <div class="step">
//               <div class="step-number">4</div>
//               <div>
//                 <strong>Submit for final verification</strong> to unlock investor connections
//               </div>
//             </div>
//           </div>
          
//           <center>
//             <a href="${dashboardLink}" class="dashboard-btn">
//               🚀 Complete Your Startup Profile
//             </a>
//           </center>
          
//           <p class="message">
//             If the button doesn't work, copy and paste this link in your browser:
//           </p>
          
//           <div class="link-container">
//             <a href="${dashboardLink}" class="link">${dashboardLink}</a>
//           </div>
          
//           <p class="message">
//             <strong>Need help?</strong> Our support team is available at 
//             <a href="mailto:support@northeaststartuphub.com" style="color: #dc2626;">
//               support@northeaststartuphub.com
//             </a>
//           </p>
//         </div>
        
//         <div class="footer">
//           <p>Northeast Startup Hub</p>
//           <p>Empowering Entrepreneurs Across Northeast India</p>
//           <p>© ${new Date().getFullYear()} Northeast Startup Hub. All rights reserved.</p>
          
//           <div class="social-links">
//             <a href="#" class="social-icon">LinkedIn</a> •
//             <a href="#" class="social-icon">Twitter</a> •
//             <a href="#" class="social-icon">Instagram</a> •
//             <a href="#" class="social-icon">Website</a>
//           </div>
//         </div>
//       </div>
//     </body>
//     </html>
//   `;
// };

// // Function to send approval email
// export const sendApprovalEmail = async (startupEmail, founderEmail, startupName, startupId) => {
//   try {
//     // Calculate deadline (24 hours from now)
//     const deadline = new Date(Date.now() + 24 * 60 * 60 * 1000);
//     const formattedDeadline = deadline.toLocaleString('en-IN', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       timeZone: 'Asia/Kolkata'
//     });

//     // Email content
//     const mailOptions = {
//       from: `"Northeast Startup Hub" <${process.env.SMTP_USER}>`,
//       to: [startupEmail, founderEmail].filter(email => email).join(', '),
//       subject: `🎉 Congratulations! ${startupName} Has Been Approved on Northeast Startup Hub`,
//       html: getApprovalEmailHTML(startupName, startupId, formattedDeadline),
//       text: `Congratulations! Your startup ${startupName} has been approved. Please complete your profile at ${process.env.NEXT_PUBLIC_WEBSITE_URL}/startup/${startupId} within 24 hours.`,
//     };

//     // Send email
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Approval email sent:', info.messageId);
//     return { success: true, messageId: info.messageId };
    
//   } catch (error) {
//     console.error('Error sending approval email:', error);
//     return { success: false, error: error.message };
//   }
// };

// // Test email function (optional)
// export const testEmailConnection = async () => {
//   try {
//     await transporter.verify();
//     console.log('SMTP connection verified successfully');
//     return true;
//   } catch (error) {
//     console.error('SMTP connection failed:', error);
//     return false;
//   }
// };