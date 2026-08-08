import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../hooks';
import type { ColorName } from '../types';
import type { IconName } from './icons';
import { ICON_PATHS } from './icons';

/** Color roles an icon may take. */
export type IconColor = Extract<
  ColorName,
  | 'accent'
  | 'danger'
  | 'info'
  | 'onAccent'
  | 'onDark'
  | 'success'
  | 'text'
  | 'text2'
  | 'textMuted'
  | 'warning'
>;

export type IconProps = {
  /** A theme color role. Ignored when `colorValue` is given. */
  color?: IconColor;
  /**
   * An explicit color, for the caller that already resolved one — a button
   * matching its own label, a row tinting to its state. Prefer `color`.
   */
  colorValue?: string;
  name: IconName;
  size?: number;
  strokeWidth?: number;
};

/**
 * Draws one glyph from `icons.ts`.
 *
 * Icons are decorative here: the control around the icon carries the
 * accessibility label, so nothing is announced twice.
 */
export function Icon({
  color = 'text',
  colorValue,
  name,
  size,
  strokeWidth = 2,
}: IconProps) {
  const theme = useTheme();
  const resolvedSize = size ?? theme.size.icon.md;

  return (
    <Svg
      accessibilityElementsHidden
      fill="none"
      height={resolvedSize}
      importantForAccessibility="no"
      stroke={colorValue ?? theme.colors[color]}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={resolvedSize}>
      {ICON_PATHS[name].map(path => (
        <Path key={path} d={path} />
      ))}
    </Svg>
  );
}
