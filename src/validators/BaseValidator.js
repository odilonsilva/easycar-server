import { validationResult } from "express-validator";

export default function validate(request) {
  const errors = validationResult(request);
  if (!errors.isEmpty()) return { errors: errors.array() };

  return null;
}
