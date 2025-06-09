import { cn } from "@sglara/cn"
import { SfProDisplay } from "sf-pro/display"

export default function ProtectionCaptchaPage() {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="flex flex-col max-w-7xl w-full py-20">
        <h1 className={cn("font-semibold text-3xl tracking-[0.3px]", SfProDisplay.className)}>Captcha</h1>
        <h2 className={cn("font-normal text-2xl tracking-[0.4px] text-white/60", SfProDisplay.className)}>Please verify that you are not a robot.</h2>
      </div>
    </main>
  );
}