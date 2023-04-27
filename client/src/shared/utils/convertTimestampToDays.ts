export function convertTimestampToDays (exp: number): number {
  return Math.ceil((exp * 1000 - Date.now()) / 86400000);
}
