export type ToastTone = 'info' | 'success' | 'warning' | 'danger';

export type ToastMessage = {
  id: string;
  message: string;
  tone: ToastTone;
};
