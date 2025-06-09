import CaptchaFormComponent from './form'

export default async function ProtectionCaptchaPage() {
  return (
    <main className="flex flex-col items-center w-full">
      <CaptchaFormComponent />
    </main>
  )
}