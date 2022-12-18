export function getEnvBool(value) {
  if (!value || typeof value !== 'string') {
    return false;
  }

  return value.toLowerCase() === 'true';
}

export function getEnvInt(value) {
  if (!value) {
    return 0;
  }

  return parseInt(value, 10);
}
