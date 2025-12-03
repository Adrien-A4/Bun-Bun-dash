"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Sparkles, Star, Zap, LogOut, Users, Shield } from "lucide-react";
import '../globals.css'

interface Server {
  id: string;
  name: string;
  icon?: string | null;
  memberCount: number;
}

interface User {
  id: string;
  username: string;
  avatar?: string | null;
}

export default function ServersPage() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [showContent, setShowContent] = useState(false);
  // Remove darkMode, always use warm theme
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("discord_token");

    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      setShowContent(true);
      return;
    }

    setAuthenticated(true);

    async function fetchServers() {
      try {
        const userRes = await fetch("https://discord.com/api/users/@me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!userRes.ok) throw new Error("Failed to fetch user info");
        const userData = await userRes.json() as { id: string; username: string; avatar?: string | null };

        setUser({
          id: userData.id,
          username: userData.username,
          avatar: userData.avatar
            ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`
            : null,
        });

        const res = await fetch("/api/mutual-servers", {
          headers: {
            Authorization: `Bearer ${token}`,
            "x-dashboard-api-key": process.env.NEXT_PUBLIC_DASHBOARD_API_KEY || "",
          },
        });

        const data = await res.json();
        console.log('mutual servers API response:', data);

        if (!res.ok) {
          console.log('error fetching servers:', data);
          setServers([]);
        } else if (data.success) {
          setServers(data.guilds || []);
        } else {
          setServers([]);
        }
      } catch (err) {
        console.error("Error fetching servers:", err);
        setServers([]);
      } finally {
        setLoading(false);
        setTimeout(() => setShowContent(true), 100);
      }
    }

    fetchServers();
  }, []);

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

  const FloatingElements = ({ darkMode = false }: { darkMode?: boolean }) => {
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

  const handleManage = (guildId: string) => {
    document.body.classList.add("fade-out");
    setTimeout(() => router.push(`/dashboard/${guildId}`), 300);
  };

  const handleLogin = () => {
    window.location.href = "/api/auth/discord";
  };

  const handleLogout = () => {
    Cookies.remove("discord_token");
    window.location.reload();
  };

  return (
    <div className="min-h-screen overflow-hidden relative transition-colors duration-500 bg-[#F8B96F] text-[#3a2a13]">
      {/* Background Elements */}
      <ParticleBackground darkMode={false} />
      <FloatingElements darkMode={false} />
      
      {/* Animated gradient orbs */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 bg-[#F8B96F]/40" />
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 bg-[#F8B96F]/30" />

      {/* Top right user info and logout */}
      {authenticated && user && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          whileHover={{ scale: 1.05 }}
          className="absolute top-8 right-8 z-20 flex items-center gap-3 backdrop-blur-xl bg-[#fff6e6] border border-[#f8b96f] px-6 py-3 rounded-2xl shadow-2xl"
        >
          {user.avatar ? (
            <motion.img
              src={user.avatar}
              alt="Profile"
              width={40}
              height={40}
              draggable={false}
              className="rounded-full border-2 border-[#f8b96f]"
              initial={{ opacity: 0 }}
              animate={showContent ? { opacity: 1 } : { opacity: 0 }}
              whileHover={{ scale: 1.1 }}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#fff6e6] flex items-center justify-center text-xl font-bold border border-[#f8b96f]">
              {user.username[0]}
            </div>
          )}
          <span className="font-semibold text-[#b88b4a]">{user.username}</span>
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: "#ef4444" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="ml-2 px-3 py-2 bg-[#f8b96f]/30 hover:bg-[#f7a94a] rounded-xl text-sm font-medium transition-all flex items-center gap-2 text-[#3a2a13]"
          >
            <LogOut size={14} />
            Logout
          </motion.button>
        </motion.div>
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12 justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Image 
              src="/bunbun.png" 
              alt="Bun Bun Logo" 
              width={60} 
              height={60} 
              className="rounded-full border-4 border-white/20 backdrop-blur-lg shadow-2xl"
              draggable={false} 
            />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#3a2a13] drop-shadow">
            Choose a Server
          </h1>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-16 h-16 rounded-full border-4 border-transparent border-t-[#f8b96f] border-r-[#f8b96f]"
            />
          </div>
        ) : !authenticated ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={showContent ? { opacity: 1 } : { opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Shield size={64} className="text-[#b88b4a] mb-4" />
            <p className="text-[#b88b4a] text-lg mb-6">Please login to manage your servers</p>
            <motion.button
              onClick={handleLogin}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl bg-[#F8B96F] text-[#3a2a13] font-semibold shadow-2xl hover:shadow-lg transition-all duration-300 border border-[#f8b96f] flex items-center gap-3"
            >
              <Image src="/discord.png" alt="Discord" width={24} height={24} />
              Login with Discord
            </motion.button>
          </motion.div>
        ) : servers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={showContent ? { opacity: 1 } : { opacity: 0 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <Users size={64} className="text-[#b88b4a] mb-4" />
            <p className="text-[#b88b4a] text-lg text-center">
              No mutual servers found where Bun Bun has management permissions.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {servers.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={showContent ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.95 }}
                transition={{
                  delay: i * 0.1,
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative rounded-3xl backdrop-blur-xl bg-[#fff6e6] border border-[#f8b96f] shadow-2xl p-8 flex flex-col items-center text-center overflow-hidden group min-w-[280px]"
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="relative z-10">
                  <div className="flex justify-center items-center w-full mb-6">
                    {s.icon ? (
                      <motion.img 
                        src={s.icon} 
                        alt={`${s.name} icon`} 
                        width={96} 
                        height={96} 
                        className="rounded-full shadow-lg border-2 border-[#f8b96f] aspect-square object-cover"
                        whileHover={{ scale: 1.1 }}
                      />
                    ) : (
                      <motion.div 
                        className="w-24 h-24 rounded-full bg-[#fff6e6] flex items-center justify-center text-3xl font-bold border-2 border-[#f8b96f]"
                        whileHover={{ scale: 1.1 }}
                      >
                        {s.name[0]}
                      </motion.div>
                    )}
                  </div>

                  <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-[#3a2a13]">{s.name}</h2>
                  <p className="text-sm text-[#b88b4a] mb-4 flex items-center justify-center gap-2">
                    <Users size={16} />
                    {s.memberCount.toLocaleString()} members
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleManage(s.id)}
                    className="w-full px-4 py-3 rounded-xl bg-[#F8B96F] text-[#3a2a13] font-medium shadow-lg hover:shadow-lg transition-all duration-300 border border-[#f8b96f]"
                  >
                    Manage Server
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .fade-out {
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}