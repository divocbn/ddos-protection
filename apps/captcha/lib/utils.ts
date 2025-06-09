
import { headers } from 'next/headers'

/**
 * note(module):
 * Utility function to handle IP address retrieval in development environments
 * where Next.js may return invalid or localhost IP addresses
 */
export async function getIp() {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = (await headers()).get("x-forwarded-for");
  if (forwardedFor) {
    if (forwardedFor === "::1") return "127.0.0.1";
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }
  return (await headers()).get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
}