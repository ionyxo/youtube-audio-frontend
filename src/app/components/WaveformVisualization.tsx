import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface WaveformVisualizationProps {
  isProcessing: boolean;
}

export function WaveformVisualization({ isProcessing }: WaveformVisualizationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    // Generate waveform
    const generateWaveform = () => {
      const width = canvas.getBoundingClientRect().width;
      const height = canvas.getBoundingClientRect().height;
      const centerY = height / 2;
      const bars = 100;
      const barWidth = width / bars;

      ctx.clearRect(0, 0, width, height);

      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, '#39ff14');
      gradient.addColorStop(0.5, '#06b6d4');
      gradient.addColorStop(1, '#8b5cf6');

      for (let i = 0; i < bars; i++) {
        const x = i * barWidth;
        const amplitude = isProcessing 
          ? Math.random() * 0.5 + 0.3
          : Math.sin(i * 0.1) * 0.5 + Math.random() * 0.3;
        const barHeight = amplitude * height * 0.7;

        // Draw bar with glow effect
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.8;
        ctx.fillRect(x, centerY - barHeight / 2, barWidth - 2, barHeight);

        // Add glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#39ff14';
        ctx.fillRect(x, centerY - barHeight / 2, barWidth - 2, barHeight);
        ctx.shadowBlur = 0;
      }
    };

    generateWaveform();
    
    let animationFrame: number;
    if (isProcessing) {
      const animate = () => {
        generateWaveform();
        animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isProcessing]);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <canvas
          ref={canvasRef}
          className="w-full h-32 rounded-xl"
        />
        
        {/* Overlay grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full flex items-center justify-between px-4 opacity-20">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="w-px h-full bg-foreground/20" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Info label */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>Audio Waveform</span>
        <span className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-primary animate-pulse' : 'bg-accent'}`} />
          {isProcessing ? 'Analyzing...' : 'Complete'}
        </span>
      </div>
    </div>
  );
}
