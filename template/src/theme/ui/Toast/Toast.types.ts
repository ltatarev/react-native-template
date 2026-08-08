export type ToastTone = 'info' | 'success' | 'warning' | 'danger';

export type ToastAction = {
  label: string;
  onPress: () => void;
};

export type ToastMessage = {
  id: string;
  message: string;
  tone: ToastTone;
  /**
   * Optional inline action — an Undo, a Retry, a Show me. Pressing it also
   * dismisses the toast. Toasts with one linger longer so it can be reached.
   */
  action?: ToastAction;
};
