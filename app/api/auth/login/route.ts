import { login } from '@/app/actions/auth'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const result = await login(formData)

    if (result.success) {
      revalidatePath('/admin')
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
