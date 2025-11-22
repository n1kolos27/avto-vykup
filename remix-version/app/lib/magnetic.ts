/**
 * Magnetic effect for buttons and interactive elements
 * Creates a subtle attraction effect when cursor is near the element
 */

export interface MagneticOptions {
  strength?: number;
  radius?: number;
  disabled?: boolean;
}

export const initMagnetic = (
  element: HTMLElement,
  options: MagneticOptions = {}
): (() => void) => {
  const { strength = 0.3, radius = 100, disabled = false } = options;

  if (disabled) {
    return () => {};
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return () => {};
  }

  let isHovering = false;
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let rafId: number | null = null;

  const updatePosition = () => {
    const dx = targetX - currentX;
    const dy = targetY - currentY;

    currentX += dx * 0.1;
    currentY += dy * 0.1;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0.1) {
      element.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      rafId = requestAnimationFrame(updatePosition);
    } else {
      element.style.transform = '';
      currentX = 0;
      currentY = 0;
      targetX = 0;
      targetY = 0;
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isHovering) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distanceX = mouseX - centerX;
    const distanceY = mouseY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < radius) {
      const force = (radius - distance) / radius;
      targetX = distanceX * strength * force;
      targetY = distanceY * strength * force;

      if (rafId === null) {
        rafId = requestAnimationFrame(updatePosition);
      }
    } else {
      targetX = 0;
      targetY = 0;
    }
  };

  const handleMouseEnter = () => {
    isHovering = true;
  };

  const handleMouseLeave = () => {
    isHovering = false;
    targetX = 0;
    targetY = 0;
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);
  window.addEventListener('mousemove', handleMouseMove);

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
    window.removeEventListener('mousemove', handleMouseMove);
    if (rafId !== null) {
      cancelAnimationFrame(rafId);
    }
    element.style.transform = '';
  };
};

