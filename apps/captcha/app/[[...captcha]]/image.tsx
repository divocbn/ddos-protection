"use client"

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { cn } from "@sglara/cn"

import { generateCaptcha } from '@/app/_actions/generate-captcha.action'
import { ReloadIcon } from '@radix-ui/react-icons'

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
          className="w-full h-full object-contain"
          alt="Captcha"
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
        <ReloadIcon />  Refresh
      </button>
    </div>
  )
}) 