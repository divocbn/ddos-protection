'use server'

import sharp from 'sharp'
import { redis } from '@ddos-protection/redis'
import { headers } from 'next/headers'
import { nanoid } from 'nanoid'

export async function generateCaptcha() {
  const text = nanoid(6)
  const header = headers()

  // ??? - same shi as in validate captcha
  const forwardedFor = (await header).get('x-forwarded-for')
  const realIp = (await header).get('x-real-ip')

  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown'

  const image = new sharp({
    create: {
      width: 300,
      height: 50,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 }
    }
  })

  const svgText = `
    <svg width="300" height="50">
      <style>
        .text { font: bold 32px Arial; fill: #ffffff; }
      </style>
      <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="text">
        ${text}
      </text>
    </svg>
  `;

  const buffer = await image
    .composite([{
      input: Buffer.from(svgText),
      top: 0,
      left: 0,
    }])
    .png()
    .toBuffer()

  await redis.setex(`captcha:${ip}`, 5 * 60, text);

  return {
    image: `data:image/png;base64,${buffer.toString('base64')}`
  }
} 