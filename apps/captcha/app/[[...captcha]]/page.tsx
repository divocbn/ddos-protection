"use client"

import { useState, useRef } from "react"
import { cn } from "@sglara/cn"
import { SfProDisplay } from "sf-pro/display"
import { UpdateIcon } from "@radix-ui/react-icons"
import { CaptchaImageComponent } from "./image"

import { validateCaptcha } from "./_actions/validate-captcha.action"
import { CaptchaImageRef } from "./_types/captcha-image.ref"

interface ValidationState {
  success: boolean
  message: string
}

export default function ProtectionCaptchaPage() {
  const [input, setInput] = useState("")
  const [pending, setPending] = useState(false)

  const [state, setState] = useState<ValidationState>({
    success: false,
    message: ""
  })

  const captchaRef = useRef<CaptchaImageRef>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleValidationFailure = () => {
    setInput("")
    captchaRef.current?.regenerate()
  }

  const handleSubmit = async () => {
    if (!input) return

    setPending(true)
    try {
      const result = await validateCaptcha({ input })
      setState(result)

      if (!result.success) {
        handleValidationFailure()
      } else {
        window.location.reload()
      }
    } catch (error) {
      setState({
        success: false,
        message: "An error occurred. Please try again."
      })
      handleValidationFailure()
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="flex flex-col items-center w-full">
      <div className="flex flex-col max-w-7xl w-full py-20 px-2">
        <h1 className={cn("font-semibold text-3xl tracking-[0.3px]", SfProDisplay.className)}>
          Captcha
        </h1>
        <h2 className={cn("font-normal text-2xl tracking-[0.4px] text-white/60", SfProDisplay.className)}>
          Please verify that you are not a robot.
        </h2>

        <div className="mt-8">
          <CaptchaImageComponent ref={captchaRef} />

          <div className="mt-4">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter the code above"
              className={cn(
                "w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg",
                "focus:outline-none focus:ring-2 focus:ring-white/30",
                "placeholder:text-white/40"
              )}
              required
            />
          </div>

          {state.message && (
            <p className={cn(
              "mt-2 text-sm",
              state.success ? "text-green-400" : "text-red-400"
            )}>
              {state.message}
            </p>
          )}

          <button
            type="button"
            disabled={pending}
            onClick={handleSubmit}
            className={cn(
              "mt-6 px-6 py-3 bg-white text-black rounded-lg font-medium",
              "flex items-center gap-2",
              "hover:bg-white/90 transition-colors, cursor-pointer",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {pending && <UpdateIcon className="animate-spin" />}
            {pending ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>
    </main>
  )
}