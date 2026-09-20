export function canRequestScreenWakeLock(): boolean {
  return typeof navigator !== "undefined" && "wakeLock" in navigator;
}
