"use client"

import React, { useEffect, useRef, useState } from 'react';

interface Circle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  color: string;
  opacity: number;
}

const MovingCirclesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const colors = [
    '123, 172, 224',  // #4693C0
    '108, 108, 209',  // #6C6CD1
    '255, 95, 140',  // #FF5F8C
  ];

  const createCircles = (num: number, width: number, height: number) => {
    const newCircles: Circle[] = [];
    for (let i = 0; i < num; i++) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      newCircles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 10 + 4,
        dx: Math.random() < 0.5 ? 0.2 : -0.2,
        dy: Math.random() < 0.5 ? 0.2 : -0.2,
        color: randomColor,
        opacity: 0.1, // Reducida la opacidad inicial de 0.5 a 0.2 (20%)
      });
    }
    setCircles(newCircles);
  };

  const drawCircles = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);
    circles.forEach((circle) => {
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);

      const distToLeft = circle.x - circle.radius;
      const distToRight = width - (circle.x + circle.radius);
      const distToTop = circle.y - circle.radius;
      const distToBottom = height - (circle.y + circle.radius);

      const minDistance = Math.min(distToLeft, distToRight, distToTop, distToBottom);

      if (minDistance <= 0) {
        circle.opacity = 0;
      } else {
        circle.opacity = Math.max(0.2 * (minDistance / 50), 0); // Reducida la opacidad máxima de 0.5 a 0.2
      }

      ctx.fillStyle = `rgba(${circle.color}, ${circle.opacity})`;
      ctx.fill();

      circle.x += circle.dx;
      circle.y += circle.dy;

      if (circle.x + circle.radius > width || circle.x - circle.radius < 0) {
        circle.dx *= -1;
      }
      if (circle.y + circle.radius > height || circle.y - circle.radius < 0) {
        circle.dy *= -1;
      }
    });
  };

  const handleResize = () => {
    if (canvasRef.current && containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      const dpr = window.devicePixelRatio || 1;

      canvasRef.current.width = offsetWidth * dpr;
      canvasRef.current.height = offsetHeight * dpr;
      canvasRef.current.style.width = `${offsetWidth}px`;
      canvasRef.current.style.height = `${offsetHeight}px`;

      setDimensions({ width: canvasRef.current.width, height: canvasRef.current.height });
      createCircles(5, canvasRef.current.width, canvasRef.current.height);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);

    const animationLoop = () => {
      drawCircles(ctx, dimensions.width / dpr, dimensions.height / dpr);
      requestAnimationFrame(animationLoop);
    };

    animationLoop();
  }, [circles, dimensions]);

  return (
    <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default MovingCirclesBackground;