import nodemailer from "nodemailer"

interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
  cc?: string[]
}

export async function sendEmail({ to, subject, html, text, cc }: EmailOptions) {
  // 在开发环境中，只记录邮件内容而不实际发送
  if (process.env.NODE_ENV === "development") {
    console.log("📧 Email would be sent in production:")
    console.log("To:", to)
    console.log("Subject:", subject)
    console.log("HTML:", html)
    if (cc) console.log("CC:", cc)
    return { success: true, messageId: "dev-mode-" + Date.now() }
  }

  try {
    // 创建邮件传输器
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number.parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // 发送邮件
    const info = await transporter.sendMail({
      from: `"Xiamen Union Spares" <${process.env.SMTP_USER}>`,
      to,
      cc,
      subject,
      text: text || html.replace(/<[^>]*>/g, ""), // 如果没有提供纯文本，从HTML中提取
      html,
    })

    console.log("✅ Email sent successfully:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("❌ Email sending failed:", error)
    return { success: false, error: error.message }
  }
}

export function generateContactEmailHTML(data: {
  name: string
  email: string
  company?: string
  phone?: string
  subject: string
  message: string
}) {
  const currentTime = new Date().toLocaleString("zh-CN", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f8fafc; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 20px; }
        .label { font-weight: bold; color: #374151; margin-bottom: 5px; display: block; }
        .value { background: white; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; }
        .message-box { background: white; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb; min-height: 100px; }
        .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
        .timestamp { background: #dbeafe; padding: 10px; border-radius: 6px; text-align: center; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🔔 New Contact Form Submission</h1>
        <p>Xiamen Union Spares Ltd.</p>
      </div>
      
      <div class="content">
        <div class="timestamp">
          <strong>📅 Received:</strong> ${currentTime} (China Time)
        </div>
        
        <div class="field">
          <span class="label">👤 Name:</span>
          <div class="value">${data.name}</div>
        </div>
        
        <div class="field">
          <span class="label">📧 Email:</span>
          <div class="value">${data.email}</div>
        </div>
        
        ${
          data.company
            ? `
        <div class="field">
          <span class="label">🏢 Company:</span>
          <div class="value">${data.company}</div>
        </div>
        `
            : ""
        }
        
        ${
          data.phone
            ? `
        <div class="field">
          <span class="label">📞 Phone:</span>
          <div class="value">${data.phone}</div>
        </div>
        `
            : ""
        }
        
        <div class="field">
          <span class="label">📋 Subject:</span>
          <div class="value">${data.subject}</div>
        </div>
        
        <div class="field">
          <span class="label">💬 Message:</span>
          <div class="message-box">${data.message.replace(/\n/g, "<br>")}</div>
        </div>
      </div>
      
      <div class="footer">
        <p>This email was automatically generated from the contact form on xiamenunion.com</p>
        <p>Please respond to the customer at: <strong>${data.email}</strong></p>
      </div>
    </body>
    </html>
  `
}
