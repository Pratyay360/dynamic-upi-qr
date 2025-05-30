"use client";

import { useState, useEffect } from 'react';

interface LottiePlayerProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

export const LottiePlayer: React.FC<LottiePlayerProps> = ({
  src,
  autoplay = true,
  loop = true,
  style,
  className
}) => {
  const [Player, setPlayer] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    import('@lottiefiles/react-lottie-player').then((module) => {
      setPlayer(() => module.Player);
    });
  }, []);

  if (!mounted || !Player) {
    // Fallback UI during SSR or while loading
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={style}
      >
        <div className="animate-pulse bg-blue-200 dark:bg-blue-800 rounded-full w-full h-full" />
      </div>
    );
  }

  return (
    <Player
      autoplay={autoplay}
      loop={loop}
      src={src}
      style={style}
      className={className}
    />
  );
};
