type LogContext = Record<string, unknown>;

function info(message: string, context?: LogContext) {
  if (__DEV__) {
    globalThis.console.info(message, context ?? {});
  }
}

function warn(message: string, context?: LogContext) {
  if (__DEV__) {
    globalThis.console.warn(message, context ?? {});
  }
}

function error(message: string, context?: LogContext) {
  if (__DEV__) {
    globalThis.console.error(message, context ?? {});
  }
}

export const Logger = {
  error,
  info,
  warn,
};
