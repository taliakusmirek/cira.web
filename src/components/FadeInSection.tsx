import React from 'react';
import { useInView } from '../hooks/useInView';

type FadeInSectionChildren = React.ReactNode | ((props: { isInView: boolean }) => React.ReactNode);

interface FadeInSectionProps {
  children: FadeInSectionChildren;
  className?: string;
  style?: React.CSSProperties;
}

export function FadeInSection({ children, className = '', style = {} }: FadeInSectionProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const content = typeof children === 'function'
    ? (children as (props: { isInView: boolean }) => React.ReactNode)({ isInView })
    : children;

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={style}
    >
      {content}
    </div>
  );
}
