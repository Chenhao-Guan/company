"use server"

import { sendEmail, generateContactEmailHTML } from "@/lib/email"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address"),
  company: z.string().max(100, "Company name is too long").optional(),
  phone: z.string().max(20, "Phone number is too long").optional(),
  subject: z.string().min(1, "Subject is required").max(200, "Subject is too long"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
})

export async function submitContactForm(formData: FormData) {
  try {
    // 验证表单数据
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string | undefined,
      phone: formData.get("phone") as string | undefined,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    const validatedData = contactSchema.parse(data)

    // 生成邮件内容
    const emailHTML = generateContactEmailHTML(validatedData)

    // 发送邮件
    const ccEmail = process.env.CONTACT_CC_EMAIL
    const result = await sendEmail({
      to: process.env.CONTACT_EMAIL || "info@xiamenunion.com",
      subject: `New Contact Form: ${validatedData.subject}`,
      html: emailHTML,
      ...(ccEmail && { cc: [ccEmail] }),
    })

    if (result.success) {
      // 可选：发送内部通知
      if (process.env.INTERNAL_NOTIFICATION_EMAIL) {
        await sendEmail({
          to: process.env.INTERNAL_NOTIFICATION_EMAIL,
          subject: `🔔 New Contact Form Submission - ${validatedData.subject}`,
          html: `
            <h3>New contact form submission received</h3>
            <p><strong>From:</strong> ${validatedData.name} (${validatedData.email})</p>
            <p><strong>Subject:</strong> ${validatedData.subject}</p>
            <p><strong>Company:</strong> ${validatedData.company || "Not provided"}</p>
            <p>Please check the main contact email for full details.</p>
          `,
        })
      }

      return {
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
      }
    } else {
      throw new Error(result.error || "Failed to send email")
    }
  } catch (error) {
    console.error("Contact form submission error:", error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Please check your input: " + error.errors.map((e) => e.message).join(", "),
      }
    }

    return {
      success: false,
      message: "Sorry, there was an error sending your message. Please try again later.",
    }
  }
}
