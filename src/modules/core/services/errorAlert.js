import { Alert } from 'react-native';

const DEFAULT_ERROR_TITLE = 'Dogodila se pogreška...';
const DEFAULT_ERROR_MESSAGE = 'Molimo pokušajte kasnije.';
const DEFAULT_BUTTON = [{ text: 'OK' }];

export function showErrorAlert({ title, message, buttons, options } = {}) {
  const resolvedTitle = title || DEFAULT_ERROR_TITLE;
  const resolvedMessage = message ?? DEFAULT_ERROR_MESSAGE;
  const resolvedButtons = buttons || DEFAULT_BUTTON;

  Alert.alert(resolvedTitle, resolvedMessage, resolvedButtons, options);
}
