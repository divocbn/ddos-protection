'use server'

import { redis } from '@ddos-protection/redis'
import { getIp } from '@/lib/utils'

export interface ValidateCaptchaOptions {
  input: string
}

export const validateCaptcha = async ({
  input
}: ValidateCaptchaOptions) => {
  const ip = await getIp()

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

  await redis.del(`fastify-rate-limit-${ip}`)

  return {
    success: true,
    message: 'Captcha verified successfully!'
  }
} 