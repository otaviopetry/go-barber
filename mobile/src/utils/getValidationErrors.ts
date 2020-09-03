import { ValidationError } from 'yup';

interface CustomErrors {
  [key: string]: string;
}

export default function getValidationErrors(
  err: ValidationError,
): CustomErrors {
  const validationErrors: CustomErrors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
