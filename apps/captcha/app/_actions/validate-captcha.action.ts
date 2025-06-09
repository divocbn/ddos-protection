'use server'

import { redis } from '@ddos-protection/redis'
import { headers } from 'next/headers'

export interface ValidateCaptchaOptions {
  input: string
}

export const validateCaptcha = async ({
  input
}: ValidateCaptchaOptions) => {
  const header = headers()
  
  // ??? - idk what vercel did here to next js 15 but somehow it needs to be awaited???
  const forwardedFor = (await header).get('x-forwarded-for')
  const realIp = (await header).get('x-real-ip')

  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown'

  const captcha = await redis.get(`captcha:${ip}`)

  if (!captcha) {
    return {
      success: false,
      message: 'Captcha expired. Please try again.'
    }
  }

  await redis.del(`captcha:${ip}`)

  /**
   * note(module):
   * For better user experience, we ignore case sensitivity when validating the captcha text
   * to prevent confusion between uppercase and lowercase characters type shi
   */
  if (input.toLowerCase() !== captcha.toLowerCase()) {
    return {
      success: false,
      message: 'Invalid captcha. Please try again.'
    }
  }

  return {
    success: true,
    message: 'Captcha verified successfully!'
  }
} 