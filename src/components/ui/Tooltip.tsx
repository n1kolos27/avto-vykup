import React, { useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
  disabled = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = triggerRect.top + scrollY - tooltipRect.height - 8;
        left = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + scrollY + 8;
        left = triggerRect.left + scrollX + triggerRect.width / 2 - tooltipRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.left + scrollX - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + scrollY + triggerRect.height / 2 - tooltipRect.height / 2;
        left = triggerRect.right + scrollX + 8;
        break;
    }

    // Keep tooltip within viewport
    const padding = 8;
    if (left < padding) left = padding;
    if (left + tooltipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width - padding;
    }
    if (top < padding) top = padding;
    if (top + tooltipRect.height > window.innerHeight + scrollY - padding) {
      top = window.innerHeight + scrollY - tooltipRect.height - padding;
    }

    setTooltipPosition({ top, left });
  };

  const showTooltip = () => {
    if (disabled) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      requestAnimationFrame(updatePosition);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    if (isVisible) {
      updatePosition();
      const handleScroll = () => updatePosition();
      const handleResize = () => updatePosition();
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isVisible, position]);

  const child = React.cloneElement(children, {
    ref: (node: HTMLElement) => {
      triggerRef.current = node;
      if (typeof children.ref === 'function') {
        children.ref(node);
      } else if (children.ref) {
        (children.ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    },
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
  });

  return (
    <>
      {child}
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`fixed z-[1070] px-3 py-2 text-sm text-white bg-neutral-900 dark:bg-neutral-800 rounded-lg shadow-lg pointer-events-none animate-scale-in ${
            position === 'top' ? 'origin-bottom' :
            position === 'bottom' ? 'origin-top' :
            position === 'left' ? 'origin-right' :
            'origin-left'
          }`}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
          }}
        >
          {content}
          <div
            className={`absolute w-0 h-0 border-4 border-transparent ${
              position === 'top' ? 'top-full left-1/2 -translate-x-1/2 border-t-neutral-900 dark:border-t-neutral-800' :
              position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 border-b-neutral-900 dark:border-b-neutral-800' :
              position === 'left' ? 'left-full top-1/2 -translate-y-1/2 border-l-neutral-900 dark:border-l-neutral-800' :
              'right-full top-1/2 -translate-y-1/2 border-r-neutral-900 dark:border-r-neutral-800'
            }`}
          />
        </div>
      )}
    </>
  );
};

export default Tooltip;

