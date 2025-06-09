"use client"

import { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { cn } from "@sglara/cn"

import { generateCaptcha } from './_actions/generate-captcha.action'
import { ReloadIcon } from '@radix-ui/react-icons'

interface CaptchaImageRef {
  regenerate: () => Promise<void>
}

const CaptchaImageComponent = forwardRef<CaptchaImageRef>((_, ref) => {
  const [captcha, setCaptcha] = useState<{ image: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const generateNewCaptcha = async () => {
    setIsLoading(true)
    try {
      const data = await generateCaptcha()
      setCaptcha(data)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    generateNewCaptcha()
  }, [])

  useImperativeHandle(ref, () => ({
    regenerate: generateNewCaptcha
  }))

  if (!captcha || isLoading) {
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
        disabled={isLoading}
        className={cn(
          "text-sm text-white/60 hover:text-white",
          "flex items-center gap-1",
          isLoading && "opacity-50 cursor-not-allowed"
        )}
      >
        <ReloadIcon className={cn(isLoading && "animate-spin")} /> Refresh
      </button>
    </div>
  )
})

CaptchaImageComponent.displayName = "CaptchaImageComponent"
export { CaptchaImageComponent }