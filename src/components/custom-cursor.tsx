"use client";

import { useEffect, useState, memo, useCallback } from "react";

export const CustomCursor = memo(function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, scrollY: 0 });

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    setIsClicked(true);
    setIsDragging(true);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      scrollY: window.scrollY
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicked(false);
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isDragging) {
      const deltaY = e.clientY - dragStart.y;
      const newScrollY = dragStart.scrollY - deltaY;
      window.scrollTo(0, newScrollY);
    }
  }, [isDragging, dragStart.y, dragStart.scrollY]);

  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target && target.closest && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a'))) {
      setIsHovering(true);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {

    // Add event listeners
    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [updatePosition, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      className={`custom-cursor ${isClicked ? 'clicked' : ''} ${isHovering ? 'hover' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{
        left: `${position.x - 4}px`,
        top: `${position.y - 4}px`,
      }}
    />
  );
});
