import { cn } from '@lib/utils';
import { IGenericProps } from '@types/generic-types';
import { type VariantProps, cva } from 'class-variance-authority';
import React from 'react';

import { Icon } from '@components/graphic';

// ============================================================================

const buttonVariants = cva('btn', {
  variants: {
    variant: {
      filled: '',
      outline: 'btn-outline',
    },
    size: {
      xs: 'btn-xs',
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
      'x-lg': 'btn-wide',
    },
    color: {
      none: '',
      neutral: 'btn-neutral',
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      accent: 'btn-accent',
      ghost: 'btn-ghost',
      info: 'btn-info',
      success: 'btn-success',
      warning: 'btn-warning',
      error: 'btn-error',
    },
    shape: {
      square: 'btn-square',
      circle: 'btn-circle',
    },
    fullWidth: 'btn-block',
    transparent: 'glass',
    disabled: 'btn-disabled',
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
    color: 'none',
  },
});

// ============================================================================

export interface IButtonProps extends IGenericProps, React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  variant?: 'outline' | 'filled';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'x-lg';
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'info' | 'success' | 'warning' | 'error';
  shape?: 'square' | 'circle';
  link?: string;
  icon?: string;
  label?: string;
  fullWidth?: boolean;
  transparent?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, IButtonProps>(
  (
    {
      className,
      children,
      style,
      variant = 'filled',
      color = 'none',
      size = 'md',
      shape,
      type,
      role,
      icon,
      label = 'Button',
      fullWidth,
      transparent,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) => {
    const hasChildren = !!children;
    return (
      <div className={cn(`button__c f-center`, className)} style={style}>
        <button
          className={cn(
            buttonVariants({
              variant,
              size,
              color,
              shape,
              fullWidth,
              transparent,
              disabled,
            }),
          )}
          type={type}
          role={role}
          onClick={onClick}
          disabled={disabled}
          ref={ref}
          {...props}
        >
          {!!icon && <Icon icon={icon} />}
          {hasChildren ? children : <label>{label}</label>}
        </button>
      </div>
    );
  },
);
Button.displayName = 'Button';

// ============================================================================

export { Button };
