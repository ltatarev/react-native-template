import React from 'react';
import RNIcon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
  color: string;
  name: string;
  size: number;
}

export function Icon({ color, name, size }: IconProps) {
  return <RNIcon color={color} name={name} size={size} />;
}
