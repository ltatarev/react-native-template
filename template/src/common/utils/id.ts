import { nanoid } from '@reduxjs/toolkit';

/**
 * A locally-generated identity for a row the app creates itself.
 *
 * Generated on the device rather than assigned by a counter, so two devices —
 * or a device and a future server — can never collide, and a record can be
 * referenced before it has been written anywhere. Not cryptographic: these need
 * to not collide, not to resist an attacker.
 *
 * `nanoid` comes from Redux Toolkit, which is already a dependency, so this
 * costs no extra package.
 */
export function generateId(): string {
  return nanoid();
}
