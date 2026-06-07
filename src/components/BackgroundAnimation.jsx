import { useEffect, useRef, useState } from 'react';

const VISIT_KEY = 'vexquorai-visit-count';
const modes = ['genesis', 'aurora', 'neural', 'cosmos', 'holographic'];

function getNextMode() {
  if (typeof window === 'undefined') {
    return modes[0];
  }

  const storedVisit = Number.parseInt(localStorage.getItem(VISIT_KEY) || '0', 10);
  let visit = Number.isFinite(storedVisit) ? storedVisit : 0;

  if (!window.__vexquoraiVisitCounted) {
    visit = (visit % modes.length) + 1;
    localStorage.setItem(VISIT_KEY, String(visit));
    window.__vexquoraiVisitCounted = true;
  } else if (visit < 1) {
    visit = 1;
  }

  return modes[(visit - 1) % modes.length];
}

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event) => {
      pointer.current = {
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return pointer;
}

function AmbientCanvas({ mode }) {
  const canvasRef = useRef(null);
  const pointer = usePointer();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (!canvas || !context) {
      return undefined;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCompact = window.matchMedia('(max-width: 768px)').matches;
    const density = isCompact ? 0.52 : 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let frameId;
    let width = 0;
    let height = 0;
    let particles = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const countByMode = {
        neural: Math.floor(62 * density),
        cosmos: Math.floor(180 * density),
        holographic: Math.floor(48 * density),
      };
      const count = countByMode[mode] || Math.floor(38 * density);

      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.8 + 0.2,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: mode === 'cosmos' ? Math.random() * 1.8 + 0.3 : Math.random() * 2.4 + 1,
        phase: Math.random() * Math.PI * 2,
        index,
      }));
    };

    const drawNeural = (time) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        particle.x += particle.vx + pointer.current.x * 0.08;
        particle.y += particle.vy + pointer.current.y * 0.08;

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;
      });

      particles.forEach((particle, index) => {
        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 155) {
            const opacity = (1 - distance / 155) * 0.28;
            context.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }

        const pulse = Math.sin(time * 0.0015 + particle.phase) * 0.5 + 0.5;
        context.fillStyle = `rgba(125, 211, 252, ${0.34 + pulse * 0.34})`;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius + pulse, 0, Math.PI * 2);
        context.fill();
      });
    };

    const drawCosmos = (time) => {
      context.clearRect(0, 0, width, height);
      const centerX = width / 2;
      const centerY = height / 2;

      particles.forEach((particle) => {
        particle.z -= reducedMotion ? 0.0004 : 0.0014;
        if (particle.z <= 0.06) {
          particle.x = Math.random() * width;
          particle.y = Math.random() * height;
          particle.z = 1;
        }

        const depth = 1 / particle.z;
        const x = centerX + (particle.x - centerX) * depth * 0.22 + pointer.current.x * 18;
        const y = centerY + (particle.y - centerY) * depth * 0.22 + pointer.current.y * 18;
        const radius = particle.radius * depth;
        const alpha = clampCanvas(1.05 - particle.z, 0.08, 0.78);

        context.fillStyle = `rgba(191, 219, 254, ${alpha})`;
        context.beginPath();
        context.arc(x, y, Math.min(radius, 3.8), 0, Math.PI * 2);
        context.fill();
      });

      const waveY = height * 0.68 + Math.sin(time * 0.0004) * 28;
      const gradient = context.createLinearGradient(0, waveY - 80, width, waveY + 80);
      gradient.addColorStop(0, 'rgba(14, 165, 233, 0)');
      gradient.addColorStop(0.5, 'rgba(34, 211, 238, 0.16)');
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
      context.strokeStyle = gradient;
      context.lineWidth = 2;
      context.beginPath();

      for (let x = 0; x <= width; x += 18) {
        const y = waveY + Math.sin(x * 0.012 + time * 0.001) * 30;
        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }

      context.stroke();
    };

    const drawHolographic = (time) => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle) => {
        const drift = time * 0.00025 + particle.phase;
        const x = particle.x + Math.sin(drift) * 22 + pointer.current.x * 10;
        const y = particle.y + Math.cos(drift * 0.9) * 18 + pointer.current.y * 10;
        const size = 20 + particle.radius * 8;

        context.save();
        context.translate(x, y);
        context.rotate(drift * 0.35);
        context.strokeStyle = `rgba(103, 232, 249, ${0.09 + particle.z * 0.14})`;
        context.lineWidth = 1;

        if (particle.index % 3 === 0) {
          context.strokeRect(-size / 2, -size / 2, size, size);
        } else {
          context.beginPath();
          context.ellipse(0, 0, size * 0.72, size * 0.32, 0, 0, Math.PI * 2);
          context.stroke();
        }

        context.restore();
      });
    };

    const tick = (time) => {
      if (mode === 'neural') {
        drawNeural(time);
      } else if (mode === 'cosmos') {
        drawCosmos(time);
      } else if (mode === 'holographic') {
        drawHolographic(time);
      } else {
        context.clearRect(0, 0, width, height);
      }

      if (!reducedMotion) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    resize();
    tick(0);
    window.addEventListener('resize', resize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [mode, pointer]);

  return <canvas ref={canvasRef} className="vexquorai-evolution-canvas" aria-hidden="true" />;
}

function clampCanvas(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function GenesisMode() {
  return (
    <>
      <div className="bg-obj obj-1" aria-hidden="true"></div>
      <div className="bg-obj obj-2" aria-hidden="true"></div>
      <div className="bg-obj obj-3" aria-hidden="true"></div>
      <div className="bg-obj obj-4" aria-hidden="true"></div>
      <div className="bg-obj obj-5" aria-hidden="true"></div>
      <div className="bg-obj obj-6" aria-hidden="true"></div>
      <div className="vexquorai-genesis-grid" aria-hidden="true"></div>
    </>
  );
}

function AuroraMode() {
  return (
    <>
      <div className="vexquorai-aurora-ribbon ribbon-a" aria-hidden="true"></div>
      <div className="vexquorai-aurora-ribbon ribbon-b" aria-hidden="true"></div>
      <div className="vexquorai-aurora-ribbon ribbon-c" aria-hidden="true"></div>
      <div className="vexquorai-light-ray ray-a" aria-hidden="true"></div>
      <div className="vexquorai-light-ray ray-b" aria-hidden="true"></div>
    </>
  );
}

function HolographicMode() {
  return (
    <>
      <div className="vexquorai-holo-sphere sphere-a" aria-hidden="true"></div>
      <div className="vexquorai-holo-sphere sphere-b" aria-hidden="true"></div>
      <div className="vexquorai-holo-ring ring-a" aria-hidden="true"></div>
      <div className="vexquorai-holo-ring ring-b" aria-hidden="true"></div>
      <AmbientCanvas mode="holographic" />
    </>
  );
}

export default function BackgroundAnimation() {
  const [mode, setMode] = useState('genesis');

  useEffect(() => {
    const nextMode = getNextMode();
    setMode(nextMode);
    document.documentElement.dataset.vexquoraiMode = nextMode;
  }, []);

  return (
    <div className={`bg-animation-wrapper vexquorai-mode-${mode}`} aria-hidden="true">
      <div className="vexquorai-environment-layer">
        {mode === 'genesis' && <GenesisMode />}
        {mode === 'aurora' && <AuroraMode />}
        {mode === 'neural' && <AmbientCanvas mode="neural" />}
        {mode === 'cosmos' && <AmbientCanvas mode="cosmos" />}
        {mode === 'holographic' && <HolographicMode />}
      </div>
      <div className="vexquorai-lighting-layer" aria-hidden="true"></div>
      <div className="vexquorai-particle-layer" aria-hidden="true"></div>
      <div className="vexquorai-readability-layer" aria-hidden="true"></div>
    </div>
  );
}
