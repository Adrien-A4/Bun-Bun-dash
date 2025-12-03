'use client';
import { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { Sparkles, Star, Zap, RefreshCw, Code, Server, Users, Clock, Cpu, Wifi } from "lucide-react";
import Image from "next/image";
const parseUptime = (uptime: string): number => {
  const [hours, minutes, seconds] = uptime.split(':').map(Number);
  return (hours * 3600) + (minutes * 60) + seconds;
};

const formatUptime = (totalSeconds: number): string => {
  const hours = Math.floor      (totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Button = ({ 
  size = "md", 
  variant = "default", 
  onClick, 
  className = "", 
  children,
  disabled = false
}: { 
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline";
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
}) => {
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const variantClasses = {
    default: "bg-linear-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-red-500/30 border border-red-500/30",
    outline: "backdrop-blur-xl bg-linear-to-br from-white/10 to-white/5 border border-white/20 text-white hover:bg-white/20 shadow-lg"
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        rounded-xl font-medium transition-all duration-300
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
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
          'rgba(99, 102, 241, 0.15)',
          'rgba(239, 68, 68, 0.15)',
          'rgba(139, 92, 246, 0.15)',
        ]
      : [
          'rgba(59, 130, 246, 0.1)',
          'rgba(16, 185, 129, 0.1)',
          'rgba(245, 158, 11, 0.1)',
        ];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
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

            if (distance < 80) {
              ctx.beginPath();
              ctx.strokeStyle = darkMode 
                ? `rgba(99, 102, 241, ${0.1 * (1 - distance / 80)})`
                : `rgba(59, 130, 246, ${0.08 * (1 - distance / 80)})`;
              ctx.lineWidth = 0.2;
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
const FloatingElements = ({ darkMode = false }: { darkMode?: boolean }) => {
  return (
    <>
      <motion.div
        className={`fixed top-1/4 left-1/4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'} opacity-30`}
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
        <Star size={16} fill="currentColor" />
      </motion.div>
      
      <motion.div
        className={`fixed top-3/4 right-1/4 ${darkMode ? 'text-purple-400' : 'text-purple-500'} opacity-20`}
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
        <Sparkles size={12} />
      </motion.div>
      
      <motion.div
        className={`fixed bottom-1/4 left-1/2 ${darkMode ? 'text-red-400' : 'text-red-500'} opacity-30`}
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
        <Zap size={10} />
      </motion.div>
    </>
  );
};

const Status = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [currentUptime, setCurrentUptime] = useState<number | null>(null);
  const [showRaw, setShowRaw] = useState(false);
  // Remove darkMode, always use warm theme

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      let res;
      try {
        res = await fetch("/api/status", { 
          method: "GET",
          cache: 'no-cache'
        });
      } catch (apiError) {
        console.warn('API route not found, trying direct connection...');
        res = await fetch("http:localhost:3000/status", { 
          method: "GET",
          cache: 'no-cache'
        });
      }
      
      if (!res.ok) {
        throw new Error(`Status fetch failed: ${res.status}`);
      }
      
      const json = await res.json();
      setData(json);
      if (json?.bot?.uptime) {
        setCurrentUptime(parseUptime(json.bot.uptime));
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError('Failed to connect to status server. Please ensure the bot is running.');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    const statusId = setInterval(fetchStatus, 30000);
    return () => clearInterval(statusId);
  }, []);

  useEffect(() => {
    if (currentUptime === null) return;
    
    const uptimeId = setInterval(() => {
      setCurrentUptime(prev => prev !== null ? prev + 1 : null);
    }, 1000);

    return () => clearInterval(uptimeId);
  }, [currentUptime]);

  const uptimePercent = useMemo(() => {
    if (!data) return null;
    if (data?.bot?.uptime) {
      const uptime = parseUptime(data.bot.uptime);
      const percentage = Math.min(100, Math.round((uptime / (24 * 3600)) * 100));
      return percentage;
    }
    return null;
  }, [data]);

  const statusCards = [
    { 
      key: 'bot-tag', 
      title: 'Bot Tag', 
      value: data?.bot?.tag ?? '—', 
      desc: 'Discord identity',
      icon: Users,
      color: 'text-blue-400'
    },
    { 
      key: 'bot-id', 
      title: 'Bot ID', 
      value: data?.bot?.id ?? '—', 
      desc: 'Unique identifier',
      icon: Server,
      color: 'text-green-400'
    },
    { 
      key: 'uptime', 
      title: 'Uptime', 
      value: currentUptime !== null ? formatUptime(currentUptime) : '—', 
      desc: 'Time since last restart',
      icon: Clock,
      color: 'text-purple-400'
    },
    { 
      key: 'guilds', 
      title: 'Guilds', 
      value: data?.bot?.guilds ?? '—', 
      desc: 'Connected servers',
      icon: Users,
      color: 'text-yellow-400'
    },
    { 
      key: 'users', 
      title: 'Active Users', 
      value: data?.bot?.users ?? '—', 
      desc: 'Connected users',
      icon: Users,
      color: 'text-pink-400'
    },
    { 
      key: 'latency', 
      title: 'Latency', 
      value: data?.bot?.ping ? `${data.bot.ping}` : '—', 
      desc: 'Average response time',
      icon: Wifi,
      color: 'text-red-400'
    },
    {
      key: 'cpu',
      title: 'CPU Usage',
      value: data?.api?.cpuUsage || data?.system?.cpu ? `${Math.round((parseFloat(data?.api?.cpuUsage) || data?.system?.cpu * 100))}%` : '—',
      desc: 'CPU usage percentage',
      icon: Cpu,
      color: 'text-yellow-400'
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500 bg-[#F8B96F] text-[#3a2a13]">
      {/* Background Elements */}
      <ParticleBackground darkMode={false} />
      <FloatingElements darkMode={false} />
      {/* Animated gradient orbs (warm theme) */}
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 bg-[#F8B96F]/40" />
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 bg-[#F8B96F]/30" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6 py-12"
        >
          <motion.header
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-[#3a2a13] drop-shadow"
            >
              <Image src="/bunbun.png" alt="BunBun" width={60} height={60} draggable={false} className="inline-block align-middle mr-4" />
              <span className="align-middle">BunBun Status</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-2 text-lg text-[#7a5a2a]"
            >
              Live status and performance metrics for RoMod Bot
            </motion.p>
          </motion.header>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                <Button 
                  size="md" 
                  onClick={fetchStatus} 
                  className="gap-2 flex items-center" 
                  disabled={loading}
                >
                  <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                  {loading ? 'Refreshing...' : 'Refresh Status'}
                </Button>
                <Button 
                  size="md" 
                  variant="outline" 
                  onClick={() => setShowRaw((s) => !s)} 
                  className="gap-2 flex items-center"
                >
                  <Code size={18} />
                  {showRaw ? 'Hide Raw Data' : 'Show Raw Data'}
                </Button>
                <div className="text-sm text-gray-400">Auto-refresh every 30s</div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl backdrop-blur-xl bg-[#fff6e6] border border-[#f8b96f] shadow-2xl p-8 relative overflow-hidden"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 text-[#b88b4a] flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                    className="w-12 h-12 rounded-full border-4 border-transparent border-t-[#f8b96f] border-r-[#f8b96f]"
                  />
                  <div>Loading status information...</div>
                </motion.div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[#b91c1c] p-6 rounded-2xl backdrop-blur-lg bg-[#fff0ee] border border-[#f8b96f] text-center"
                >
                  <div className="text-lg font-semibold mb-2">Connection Error</div>
                  <div className="mb-4">{error}</div>
                  <Button size="md" onClick={fetchStatus} className="mt-2">
                    Retry Connection
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-8 relative z-10">
                  {/* Header Section */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col lg:flex-row items-start justify-between gap-8"
                  >
                    <div className="flex-1">
                      <motion.div 
                        className={`text-2xl md:text-3xl font-bold bg-linear-to-r bg-clip-text text-transparent from-gray-800 via-gray-700 to-gray-600`}
                        whileHover={{ x: 5 }}
                      >
                        {data?.name || 'RoMod Bot'}
                      </motion.div>
                      <motion.div 
                        className="text-gray-400 text-lg mt-2"
                        whileHover={{ x: 5 }}
                      >
                        {data?.version ? `Version ${data.version}` : 'Advanced Discord Moderation Bot'}
                      </motion.div>
                      <div className="mt-6 flex items-center gap-4">
                        <div className="text-gray-400">Status:</div>
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.4, type: "spring" }}
                          whileHover={{ scale: 1.05 }}
                          className={`px-4 py-2 rounded-xl font-semibold backdrop-blur-lg border ${
                            data?.status === "online"
                              ? "bg-green-600/20 text-green-400 border-green-500/30"
                              : data?.status === "offline"
                              ? "bg-red-600/20 text-red-400 border-red-500/30"
                              : data?.status === "maintenance"
                              ? "bg-gray-600/20 text-gray-400 border-gray-500/30"
                              : "bg-red-600/20 text-red-400 border-red-500/30"
                          }`}
                        >
                          {data?.status?.toUpperCase() || "UNKNOWN"}
                        </motion.div>
                      </div>
                    </div>

                    {/* Uptime Chart */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="w-full lg:w-64 h-48"
                      whileHover={{ scale: 1.05 }}
                    >
                      {uptimePercent != null ? (
                        <div className="text-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart cx="50%" cy="50%" innerRadius="50%" outerRadius="100%" data={[{ name: 'uptime', value: uptimePercent }]}>
                              <RadialBar 
                                dataKey="value" 
                                fill="#6366f1" 
                                cornerRadius={10}
                              />
                            </RadialBarChart>
                          </ResponsiveContainer>
                          <div className="text-gray-400 mt-3 text-lg font-semibold">
                            Uptime: {uptimePercent}%
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400 h-full flex flex-col items-center justify-center">
                          <Clock size={48} className="mb-2 opacity-50" />
                          <div>Uptime: {data?.uptime ?? '—'}</div>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {statusCards.map((stat, index) => {
                      const Icon = stat.icon;
                      return (
                        <motion.div
                          key={stat.key}
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                          whileHover={{ y: -4, scale: 1.02 }}
                          className="rounded-2xl backdrop-blur-lg bg-linear-to-br from-white/5 to-white/10 border border-white/20 p-6 group relative overflow-hidden"
                        >
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          
                          <div className="flex items-center gap-4 relative z-10">
                            <div className={`p-3 rounded-xl bg-[#fff6e6] border border-[#f8b96f] ${stat.color}`}>
                              <Icon size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-sm font-semibold text-[#b88b4a] mb-1">{stat.title}</div>
                              <motion.div 
                                className={`text-2xl font-bold text-[#3a2a13] ${stat.key === 'bot-id' ? 'truncate break-all max-w-[180px] md:max-w-[260px] lg:max-w-[320px]' : ''}`}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                                title={stat.value}
                              >
                                {stat.value}
                              </motion.div>
                              <div className="text-sm text-[#b88b4a] mt-1">{stat.desc}</div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {/* Last Updated Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                      whileHover={{ y: -4, scale: 1.01 }}
                      className="rounded-2xl backdrop-blur-lg bg-[#fff6e6] border border-[#f8b96f] p-6 col-span-1 md:col-span-2 lg:col-span-3 group relative overflow-hidden"
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3 rounded-xl bg-[#fff6e6] border border-[#f8b96f] text-[#b88b4a]">
                          <Clock size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-[#b88b4a]">Last Updated</div>
                          <motion.div 
                            className="text-2xl font-bold text-[#3a2a13]"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                          >
                            {data?.timestamp ? new Date(data.timestamp).toLocaleString() : '—'}
                          </motion.div>
                          <div className="text-sm text-[#b88b4a]">Status timestamp from monitoring system</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Raw Data Section */}
                  <AnimatePresence>
                    {showRaw && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-2xl backdrop-blur-lg bg-[#fff6e6] border border-[#f8b96f] overflow-hidden"
                      >
                        <div className="p-4 border-b border-[#f8b96f]">
                          <h3 className="text-lg font-semibold text-[#3a2a13] flex items-center gap-2">
                            <Code size={20} />
                            Raw Status Data
                          </h3>
                        </div>
                        <motion.pre
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="p-4 max-h-80 overflow-auto text-sm text-[#3a2a13] bg-[#fff6e6] rounded"
                        >
                          {JSON.stringify(data, null, 2)}
                        </motion.pre>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default Status;