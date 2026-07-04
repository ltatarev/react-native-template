import { Logger } from 'utils/logger';

type ErrorContext = Record<string, unknown>;

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'Unknown error';
}

function captureError(error: unknown, context?: ErrorContext) {
  Logger.error(getErrorMessage(error), {
    error,
    ...context,
  });
}

export const ErrorHandlingService = {
  captureError,
  getErrorMessage,
};
