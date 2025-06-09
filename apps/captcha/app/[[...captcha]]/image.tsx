"use client"

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { cn } from "@sglara/cn"
import { generateCaptcha } from '@/app/_actions/generate-captcha.action'

interface CaptchaImageRef {
  regenerate: () => Promise<void>
}

export const CaptchaImage = forwardRef<CaptchaImageRef>(function CaptchaImage(_, ref) {
  const [captcha, setCaptcha] = useState<{ image: string } | null>(null)

  const generateNewCaptcha = async () => {
    const data = await generateCaptcha()
    setCaptcha(data)
  }

  useEffect(() => {
    generateNewCaptcha()
  }, [])

  useImperativeHandle(ref, () => ({
    regenerate: generateNewCaptcha
  }))

  if (!captcha) {
    return (
      <div className="w-full h-16 bg-black/10 rounded-lg animate-pulse" />
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full h-16 bg-black rounded-lg p-2">
        <img 
          src={captcha.image} 
          alt="Captcha" 
          className="w-full h-full object-contain" 
        />
      </div>
      <button
        type="button"
        onClick={generateNewCaptcha}
        className={cn(
          "text-sm text-white/60 hover:text-white",
          "flex items-center gap-1"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 2v6h-6" />
          <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
          <path d="M3 22v-6h6" />
          <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
        </svg>
        Refresh
      </button>
    </div>
  )
}) 