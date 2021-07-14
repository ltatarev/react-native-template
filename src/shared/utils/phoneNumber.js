export function validatePhoneNumber(phoneNumber) {
  const phoneRegex = /^\+?\d{8,12}$/gi;

  if (phoneNumber.match(phoneRegex)) {
    return true;
  }

  return false;
}
