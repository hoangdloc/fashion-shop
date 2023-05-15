export function phoneNumberAutoFormat (phoneNumber: string): string {
  const number = phoneNumber.trim().replace(/[^0-9]/g, '');

  if (number.length < 3) {
    return number;
  }
  if (number.length < 5) {
    return number.replace(/(\d{2})(\d{1})/, '($1) $2');
  }
  if (number.length < 8) {
    return number.replace(/(\d{2})(\d{2})(\d{1})/, '($1) $2 $3');
  }
  if (number.length < 11) {
    return number.replace(/(\d{2})(\d{2})(\d{3})(\d{1})/, '($1) $2 $3 $4');
  }
  return number.replace(/(\d{2})(\d{2})(\d{3})(\d{1})/, '($1) $2 $3 $4');
}
