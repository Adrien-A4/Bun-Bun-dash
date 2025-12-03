"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  // Remove darkMode, always use warm theme
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const goBack = () => router.push("/home");
  const handleDiscordLogin = () => {
    setRedirecting(true);
    setTimeout(() => {
      window.location.href = "/api/auth/discord";
    }, 450);
  };

  // Particle Background Component
  const ParticleBackground = ({ darkMode = false }: { darkMode?: boolean }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const particles: Array<{
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        color: string;
      }> = [];

      const particleColors = darkMode 
        ? [
            'rgba(99, 102, 241, 0.2)',
            'rgba(239, 68, 68, 0.2)',
            'rgba(139, 92, 246, 0.2)',
          ]
        : [
            'rgba(59, 130, 246, 0.15)',
            'rgba(16, 185, 129, 0.15)',
            'rgba(245, 158, 11, 0.15)',
          ];

      for (let i = 0; i < 60; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();

          particles.forEach((particle2, index2) => {
            if (index !== index2) {
              const dx = particle.x - particle2.x;
              const dy = particle.y - particle2.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = darkMode 
                  ? `rgba(99, 102, 241, ${0.15 * (1 - distance / 100)})`
                  : `rgba(59, 130, 246, ${0.1 * (1 - distance / 100)})`;
                ctx.lineWidth = 0.3;
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(particle2.x, particle2.y);
                ctx.stroke();
              }
            }
          });
        });

        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
      };
    }, [darkMode]);

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />
    );
  };

  // Floating Elements
  const FloatingElements = ({ darkMode }: { darkMode: boolean }) => {
    return (
      <>
        <motion.div
          className={`fixed top-1/4 left-1/4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'} opacity-40`}
          animate={{
            y: [0, -15, 0],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Star size={20} fill="currentColor" />
        </motion.div>
        
        <motion.div
          className={`fixed top-3/4 right-1/4 ${darkMode ? 'text-purple-400' : 'text-purple-500'} opacity-30`}
          animate={{
            y: [0, 20, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          <Sparkles size={16} />
        </motion.div>
        
        <motion.div
          className={`fixed bottom-1/4 left-1/2 ${darkMode ? 'text-red-400' : 'text-red-500'} opacity-40`}
          animate={{
            y: [0, -25, 0],
            rotate: [0, -90, -180, -270, -360],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        >
          <Zap size={14} />
        </motion.div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative bg-[#F8B96F] text-[#3a2a13]">
      {/* Background Elements */}
      <ParticleBackground darkMode={false} />
      <FloatingElements darkMode={false} />
      
      {/* Animated gradient orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 bg-[#F8B96F]/40" />
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 bg-[#F8B96F]/30" />

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={mounted ? { opacity: 1, y: 0, scale: 1 } : undefined}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-6"
      >
        {/* Back button */}
        <motion.button
          onClick={goBack}
          aria-label="Back to home"
          className="absolute -top-16 left-0 inline-flex items-center gap-2 text-sm text-[#b88b4a] hover:text-[#3a2a13] transition-colors backdrop-blur-xl bg-[#fff6e6] border border-[#f8b96f] rounded-xl px-4 py-2 hover:bg-[#f8b96f]/30"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </motion.button>

        {/* Main login card */}
        <motion.div
          className="rounded-3xl backdrop-blur-xl bg-[#fff6e6] border border-[#f8b96f] shadow-2xl p-8 flex flex-col items-center relative overflow-hidden"
          whileHover={{ y: -2 }}
          transition={{ duration: 0.3 }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          
          <div className="relative z-10 w-full flex flex-col items-center">
            {/* RoMod Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative mb-6"
            >
              <motion.div
                className="relative"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/bunbun.png"
                  alt="Bun Bun Logo"
                  width={100}
                  height={100}
                  className="rounded-full border-4 backdrop-blur-lg shadow-2xl border-[#f8b96f]"
                />
                {/* Pulsing ring effect */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-[#f8b96f]/40"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold mb-3 text-center text-[#3a2a13] drop-shadow"
            >
              Welcome to Bun Bun's Dashboard!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base mb-8 text-center text-[#b88b4a]"
            >
              Sign in with Discord to access your dashboard and manage your server moderation settings.
            </motion.p>

            {/* Login Button */}
            <div className="w-full mt-4">
              <AnimatePresence>
                {!redirecting && (
                  <motion.button
                    key="discord-button"
                    onClick={handleDiscordLogin}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.96 }}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    aria-label="Sign in with Discord"
                    className="w-full px-6 py-4 rounded-2xl bg-[#F8B96F] text-[#3a2a13] font-semibold shadow-2xl hover:shadow-lg transition-all duration-300 border border-[#f8b96f] flex items-center justify-center gap-3"
                  >
                    <div className="flex items-center justify-center w-6 h-6 shrink-0">
                      <Image src="/discord.png" alt="Discord" width={24} height={24} />
                    </div>
                    <span className="leading-none">Continue with Discord</span>
                  </motion.button>
                )}

                {redirecting && (
                  <motion.div
                    key="discord-loading"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full px-6 py-4 rounded-2xl backdrop-blur-xl bg-[#fff6e6] text-[#b88b4a] font-semibold shadow-2xl border border-[#f8b96f] flex items-center justify-center gap-3"
                  >
                    <motion.div
                      className="h-5 w-5 rounded-full border-2 border-transparent border-t-[#f8b96f] border-r-[#f8b96f]"
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    />
                    <span className="leading-none">Redirecting to Discord...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 text-xs text-center text-[#b88b4a]"
            >
              By continuing, you agree to Bun Bun's{' '}
              <a href="/terms" className="underline hover:text-white transition-colors">Terms</a>{' '}
              and{' '}
              <a href="/privacy" className="underline hover:text-white transition-colors">Privacy Policy</a>.
            </motion.div>

            {/* Security notice */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-4 text-[11px] text-center text-[#b88b4a]"
            >
              Secure authentication via Discord • No data shared without permission
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}