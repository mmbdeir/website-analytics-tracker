export function isDeviceMobile() {
  return (
    navigator.userAgent.includes("Mobile") ||
    navigator.userAgent.includes("Android") ||
    navigator.userAgent.includes("iPhone")
  );
}
