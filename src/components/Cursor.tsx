import { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

export default function Cursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const trailConfig1 = { stiffness: 100, damping: 25, mass: 0.8 };
  const trailConfig2 = { stiffness: 80, damping: 30, mass: 1.2 };
  
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  const trail1X = useSpring(0, trailConfig1);
  const trail1Y = useSpring(0, trailConfig1);
  
  const trail2X = useSpring(0, trailConfig2);
  const trail2Y = useSpring(0, trailConfig2);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trail1X.set(e.clientX);
      trail1Y.set(e.clientY);
      trail2X.set(e.clientX);
      trail2Y.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main Cursor Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-brand-400 rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-brand-400/30 rounded-full pointer-events-none z-[9998] hidden md:block"
        animate={{
          width: isHovering ? 60 : 32,
          height: isHovering ? 60 : 32,
          backgroundColor: isHovering ? "rgba(173, 181, 189, 0.1)" : "transparent",
          borderColor: isHovering ? "rgba(173, 181, 189, 0.5)" : "rgba(173, 181, 189, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Trailing Glow */}
      <motion.div
        className="fixed top-0 left-0 w-48 h-48 bg-brand-400/2 rounded-full blur-3xl pointer-events-none z-[9997] hidden md:block"
        animate={{
          opacity: isHovering ? 0.6 : 0.3,
          scale: isHovering ? 1.5 : 1,
        }}
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Wispy Trails */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-brand-400/10 rounded-full blur-sm pointer-events-none z-[9996] hidden md:block"
        animate={{
          opacity: isHovering ? 0.8 : 0.4,
          scale: isHovering ? 2 : 1,
        }}
        style={{
          x: trail1X,
          y: trail1Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-brand-400/5 rounded-full blur-md pointer-events-none z-[9995] hidden md:block"
        animate={{
          opacity: isHovering ? 0.6 : 0.2,
          scale: isHovering ? 2.5 : 1,
        }}
        style={{
          x: trail2X,
          y: trail2Y,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
