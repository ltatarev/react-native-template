export function getEnvBool(value: string) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  return value.toLowerCase() === 'true';
}

export function getEnvInt(value: string) {
  if (!value) {
    return 0;
  }

  return parseInt(value, 10);
}
