import { MotionValue } from 'framer-motion';
import React from 'react';

export type TGenericObject = { [key: string]: unknown };

export type IGenericComponent = JSX.Element | React.ReactNode | null;

export interface IGenericProps {
  className?: string;
  children?: React.ReactNode;

  style?: React.CSSProperties | { [key: string]: MotionValue<any> | null | undefined };
}
