/**
 * Moves the item at `index` one place in `direction`.
 *
 * Returns a copy in the original order when the move is out of bounds — moving
 * the first item up, the last one down — so a caller can compare and skip a
 * no-op write.
 */
export function moveItem<T>(
  items: readonly T[],
  index: number,
  direction: 'up' | 'down',
): T[] {
  const targetIndex = direction === 'up' ? index - 1 : index + 1;

  if (
    index < 0 ||
    index >= items.length ||
    targetIndex < 0 ||
    targetIndex >= items.length
  ) {
    return [...items];
  }

  const next = [...items];
  const [moved] = next.splice(index, 1);
  next.splice(targetIndex, 0, moved as T);

  return next;
}

/** Groups items by a derived key, keeping each group in source order. */
export function groupBy<T, K extends string>(
  items: readonly T[],
  keyOf: (item: T) => K,
): Record<K, T[]> {
  const groups = {} as Record<K, T[]>;

  items.forEach(item => {
    const key = keyOf(item);
    const group = groups[key];

    if (group) {
      group.push(item);

      return;
    }

    groups[key] = [item];
  });

  return groups;
}

/** Drops later items whose key was already seen. Keeps the first of each. */
export function uniqueBy<T>(
  items: readonly T[],
  keyOf: (item: T) => string,
): T[] {
  const seen = new Set<string>();

  return items.filter(item => {
    const key = keyOf(item);

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}
