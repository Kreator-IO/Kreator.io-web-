import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, SearchX } from 'lucide-react';

export default function NotFound() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.55;
    }
  }, []);

  return (
    <section className="relative isolate min-h-[78vh] overflow-hidden bg-slate-950 px-4 py-28 text-white">
      <video
        ref={videoRef}
        className="absolute inset-0 -z-20 h-full w-full scale-110 object-cover opacity-45 saturate-150"
        src="/404-background.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-slate-950/50" />
      <div className="absolute inset-0 -z-10 opacity-70 mix-blend-screen">
        <motion.div
          animate={{ backgroundPosition: ['0px 0px', '44px 44px'] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.12)_1px,transparent_1px)] bg-[size:44px_44px]"
        />
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.65, 0.95, 0.65] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-3xl"
        />
      </div>

      <div className="container mx-auto flex min-h-[58vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-full max-w-4xl text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, -3, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-cyan-300 shadow-2xl shadow-blue-950/30"
          >
            <SearchX size={36} />
          </motion.div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.35em] text-blue-300">Error 404</p>
          <motion.h1
            animate={{ textShadow: ['0 0 0 rgba(34,211,238,0)', '0 0 26px rgba(34,211,238,0.35)', '0 0 0 rgba(34,211,238,0)'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            className="mt-5 text-6xl font-black tracking-tight text-white md:text-8xl"
          >
            Page Not Found
          </motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
            This page is not available, but the site shell is fully local and will still show this screen without an internet connection.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex h-14 items-center gap-2 rounded-full bg-blue-600 px-8 font-bold text-white shadow-xl shadow-blue-950/30 transition hover:bg-blue-700"
            >
              <Home size={18} />
              Go Home
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex h-14 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-8 font-bold text-white transition hover:bg-white/15"
            >
              <ArrowLeft size={18} />
              Back to Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
