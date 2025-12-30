"use server"

import { z } from 'zod'
import { db } from '@/lib/db'
import { adminUsers } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { verifyPassword, createToken, setSessionCookie, clearSessionCookie, getSession } from '@/lib/auth'
import { loginSchema } from '@/lib/validation'

export async function login(formData: FormData) {
  try {
    const data = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    }

    const validatedData = loginSchema.parse(data)

    // Get user from database
    const users = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.username, validatedData.username))
      .limit(1)

    const user = users[0]

    if (!user || !user.isActive) {
      return {
        success: false,
        message: 'Invalid credentials',
      }
    }

    // Verify password
    const isValid = await verifyPassword(validatedData.password, user.passwordHash)

    if (!isValid) {
      return {
        success: false,
        message: 'Invalid credentials',
      }
    }

    // Create token
    const token = await createToken({
      userId: user.id,
      username: user.username,
    })

    // Set cookie
    await setSessionCookie(token)

    // Update last login
    await db
      .update(adminUsers)
      .set({ lastLogin: Math.floor(Date.now() / 1000) })
      .where(eq(adminUsers.id, user.id))

    return {
      success: true,
      message: 'Login successful',
    }
  } catch (error) {
    console.error('Login error:', error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation error: ' + error.errors.map(e => e.message).join(', '),
      }
    }

    return {
      success: false,
      message: 'Login failed. Please try again.',
    }
  }
}

export async function logout(_formData?: FormData) {
  await clearSessionCookie()
}

export async function getAuthUser() {
  return await getSession()
}
