export const phoneRegex = /^(\+?\d{1,3}[- ]?)?\d{10}$/; // e.g. +8801XXXXXXXXX or 01XXXXXXXXX
export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
// Must contain: 1 uppercase, 1 lowercase, 1 number, 1 special char, min 8 chars