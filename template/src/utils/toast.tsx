import React, { useEffect, useState } from 'react';
import type { ToastMessage, ToastTone } from 'theme/ui';
import { ToastViewport } from 'theme/ui';

const TOAST_TIMEOUT_MS = 3000;

type ToastOptions = {
  message: string;
  tone?: ToastTone;
};

type ToastListener = (toasts: ToastMessage[]) => void;

let toasts: ToastMessage[] = [];
const listeners = new Set<ToastListener>();

function emitToasts() {
  listeners.forEach((listener) => listener(toasts));
}

function dismissToast(id: string) {
  toasts = toasts.filter((toast) => toast.id !== id);
  emitToasts();
}

function subscribe(listener: ToastListener) {
  listeners.add(listener);
  listener(toasts);

  return () => {
    listeners.delete(listener);
  };
}

export function showToast({ message, tone = 'info' }: ToastOptions) {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const toast = { id, message, tone };

  toasts = [...toasts, toast].slice(-3);
  emitToasts();

  setTimeout(() => dismissToast(id), TOAST_TIMEOUT_MS);
}

export function ToastHost() {
  const [visibleToasts, setVisibleToasts] = useState<ToastMessage[]>([]);

  useEffect(() => subscribe(setVisibleToasts), []);

  return <ToastViewport toasts={visibleToasts} />;
}
