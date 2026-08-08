import React, { useEffect, useState } from 'react';
import { motion } from 'theme/scales';
import type { ToastAction, ToastMessage, ToastTone } from 'theme/ui';
import { ToastViewport } from 'theme/ui';

/** Never stack more than this — past three, nobody reads any of them. */
const MAX_VISIBLE = 3;

type ToastOptions = {
  action?: ToastAction;
  message: string;
  tone?: ToastTone;
};

type ToastListener = (toasts: ToastMessage[]) => void;

let toasts: ToastMessage[] = [];
const listeners = new Set<ToastListener>();

function emitToasts() {
  listeners.forEach(listener => listener(toasts));
}

function dismissToast(id: string) {
  toasts = toasts.filter(toast => toast.id !== id);
  emitToasts();
}

function subscribe(listener: ToastListener) {
  listeners.add(listener);
  listener(toasts);

  return () => {
    listeners.delete(listener);
  };
}

/**
 * Shows a toast from anywhere — a thunk, a service, an event handler.
 *
 * A module-level store rather than a context, so code with no React tree around
 * it can still report an outcome. `ToastHost` is the one subscriber.
 */
export function showToast({ action, message, tone = 'info' }: ToastOptions): void {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  toasts = [...toasts, { action, id, message, tone }].slice(-MAX_VISIBLE);
  emitToasts();

  setTimeout(
    () => dismissToast(id),
    action ? motion.toastHoldWithAction : motion.toastHold,
  );
}

/** Drops every visible toast — e.g. when navigating away from what raised them. */
export function clearToasts(): void {
  toasts = [];
  emitToasts();
}

/** Mounted once by the app shell, above the navigator. */
export function ToastHost() {
  const [visibleToasts, setVisibleToasts] = useState<ToastMessage[]>([]);

  useEffect(() => subscribe(setVisibleToasts), []);

  return (
    <ToastViewport
      toasts={visibleToasts}
      onActionPress={toast => dismissToast(toast.id)}
    />
  );
}
