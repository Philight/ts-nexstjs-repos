/**
 * TODO: Pure SVG rendering
 */
import { cn } from '@lib/utils';
import { IGenericComponent, IGenericProps } from '@types/generic-types';
import { AnimationControls, Target, TargetAndTransition, Transition, VariantLabels, m } from 'framer-motion';
import React, { forwardRef } from 'react';

// import { useDynamicImport } from '@hooks/useDynamicImport';

// ============================================================================

const NO_ICON = 'https://ik.imagekit.io/0ovzivqyfai/_personal/icon/no_icon_kaS78G4ne.svg?updatedAt=1701541464211';
const SRC_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

// ============================================================================

interface IComponentProps extends IGenericProps {
  icon?: string;
  src?: string;
  keepColor?: boolean;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  link?: string;
  linkProps?: any;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  initial?: Target | VariantLabels | boolean;
  animate?: AnimationControls | TargetAndTransition | VariantLabels | boolean;
  transition?: Transition;
}
type Ref = HTMLDivElement;

// export const Icon = forwardRef<Ref, IComponentProps>((props, ref): IGenericComponent => {
function Icon(
  {
    icon: iconFromProps,
    src: customSrc,
    keepColor: keepColorFromProps = false,
    className,
    style,
    alt = `icon: ${iconFromProps}`,
    size,
    link,
    linkProps: linkParams = {},
    onClick,
    initial,
    animate,
    transition,
  }: IComponentProps,
  ref: Ref,
): IGenericComponent {
  const icon = iconFromProps?.toLowerCase();
  const multicolored = ['kk-primetech', 'coffee-2', 'arrow-nav-down'];
  const keepColor: boolean = keepColorFromProps || multicolored.includes(icon);

  // const {
  //   error,
  //   loading,
  //   svgIcon: loadedIcon,
  // } = useDynamicImport(icon, {
  //   fileType: 'icons',
  //   suffix: 'svg',
  // });

  const loadedIcon = `/assets/icons/${icon}.svg`;

  const src = customSrc || loadedIcon;

  const renderProps = keepColor
    ? {
        src,
      }
    : {
        style: {
          //        backgroundImage: `url("${getIcon()}")`,
          WebkitMask: `url(${src}) no-repeat center`,
          mask: `url(${src}) no-repeat center`,
        },
      };

  const { newTab = false, noreferrer = true } = linkParams;
  const linkProps = {
    ...(newTab && { target: '_blank' }),
    rel: cn(`noopener`, noreferrer && `noreferrer`),
  };

  const error = null;
  const loading = null;

  // ====================================================================================

  return error || loading ? (
    <img className={cn(`icon__c not-found`)} src={NO_ICON} />
  ) : (
    <m.figure
      className={cn(`icon__c icon-${icon} f-center`, className, size, keepColor && 'multi-color', link && 'has-link')}
      style={style}
      ref={ref}
      onClick={onClick}
      initial={initial}
      animate={animate}
      transition={transition}
      layout
    >
      {link && <div />}
      {!loading && (
        <img
          className='icon'
          alt={alt}
          // @ts-ignore
          src={SRC_PLACEHOLDER}
          loading='lazy'
          {...renderProps}
        />
      )}
    </m.figure>
  );
}

export default forwardRef(Icon);

// ============================================================================
