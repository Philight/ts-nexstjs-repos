import { cn } from '@lib/utils';
import { IGenericProps } from '@types/generic-types';
import { type VariantProps, cva } from 'class-variance-authority';
import React from 'react';

import { Icon } from '@components/graphic';

// ============================================================================

const componentVariants = cva('badge', {
  variants: {
    variant: {
      filled: '',
      outline: 'badge-outline',
    },
    size: {
      xs: 'badge-xs',
      sm: 'badge-sm',
      md: 'badge-md',
      lg: 'badge-lg',
      'x-lg': 'badge-wide',
    },
    color: {
      default: '',
      neutral: 'badge-neutral',
      primary: 'badge-primary',
      secondary: 'badge-secondary',
      accent: 'badge-accent',
      ghost: 'badge-ghost',
      info: 'badge-info',
      success: 'badge-success',
      warning: 'badge-warning',
      error: 'badge-error',
    },
    shape: {
      square: 'badge-square',
      circle: 'badge-circle',
    },
    fullWidth: 'badge-block',
    transparent: { true: 'badge-glass' },
  },
  defaultVariants: {
    variant: 'filled',
    size: 'md',
    color: 'default',
  },
});

// ============================================================================

export interface IBadgeProps extends IGenericProps, VariantProps<typeof componentVariants> {
  variant?: 'outline' | 'filled';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'x-lg';
  color?: 'neutral' | 'primary' | 'secondary' | 'accent' | 'ghost' | 'info' | 'success' | 'warning' | 'error';
  shape?: 'square' | 'circle';
  link?: string;
  icon?: string;
  label?: string;
  transparent?: boolean;
}

const Badge = React.forwardRef<IBadgeProps>(
  (
    {
      className,
      children,
      style,
      variant = 'filled',
      color = 'default',
      size = 'md',
      shape,
      role,
      icon,
      label = 'Category',
      fullWidth,
      transparent,
      onClick,
      ...props
    },
    ref,
  ) => {
    const hasChildren = !!children;
    return (
      <div
        className={cn(
          `badge__c f-center`,
          className,
          componentVariants({
            variant,
            size,
            color,
            shape,
            fullWidth,
            transparent,
          }),
        )}
        role={role}
        onClick={onClick}
        ref={ref}
        style={style}
        {...props}
      >
        {!!icon && <Icon icon={icon} />}
        {hasChildren ? children : <label>{label}</label>}
      </div>
    );
  },
);
Badge.displayName = 'Badge';

// ============================================================================

export { Badge };
