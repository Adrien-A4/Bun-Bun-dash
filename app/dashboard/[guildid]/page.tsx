'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Bot } from 'lucide-react';
import Cookies from 'js-cookie';
import {
  FiMenu,
  FiChevronsLeft,
  FiActivity,
  FiUser,
  FiImage,
  FiSave,
  FiCode,
  FiRefreshCw,
} from 'react-icons/fi';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { Sparkles, Star, Zap, ArrowLeft, Users, Shield, Key, Palette, Ban, VolumeX, AlertTriangle, Trash2, Lock, Flag, UserCheck } from 'lucide-react';

const THEME_COLOR = '#f8b96f';
const THEME_LIGHT = '#fff6e6';
const THEME_DARK = '#b88b4a';

interface Variables {
  robloxApiKey: string;
  universeId: string;
  groupId: string;
  logChannel: string;
  modRole: string;
}

interface Commands {
  ban: boolean;
  kick: boolean;
  warn: boolean;
  mute: boolean;
  purge: boolean;
  lockdown: boolean;
  report: boolean;
  userinfo: boolean;
}

interface Appearance {
  botNickname: string;
  botAvatar: string;
  botBanner: string;
}

interface Toast {
  message: string;
  success: boolean;
  visible: boolean;
}

export default function GuildDashboard() {
  const { guildid } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('variables');
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [variables, setVariables] = useState<Variables>({
    robloxApiKey: '',
    universeId: '',
    groupId: '',
    logChannel: '',
    modRole: ''
  });

  const [commands, setCommands] = useState<Commands>({
    ban: true,
    kick: true,
    warn: true,
    mute: true,
    purge: true,
    lockdown: false,
    report: true,
    userinfo: true
  });

  const [appearance, setAppearance] = useState<Appearance>({
    botNickname: 'Bun Bun',
    botAvatar: '',
    botBanner: '',
  });

  const [toast, setToast] = useState<Toast>({ message: '', success: true, visible: false });

  const showToast = (message: string, success = true) => {
    setToast({ message, success, visible: true });
    setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = Cookies.get('discord_token');
      if (!token) {
        setAuthenticated(false);
        setCheckingAuth(false);
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/mutual-servers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.guilds) {
          const server = data.guilds.find((g: any) => g.id === guildid);
          if (server) {
            setAuthenticated(true);
            setHasPermission(true);
            await Promise.all([
              fetchVariables(),
              fetchCommands(),
              fetchAppearance()
            ]);
          } else {
            setAuthenticated(true);
            setHasPermission(false);
          }
        } else {
          setAuthenticated(false);
        }
      } catch (err) {
        setAuthenticated(false);
      } finally {
        setCheckingAuth(false);
        setLoading(false);
      }
    };

    async function fetchVariables() {
      try {
        const res = await fetch(`http://104.234.236.59:30131/api/variables/${guildid}`);
        const data = await res.json();
        if (data.variables) {
          setVariables(data.variables);
        }
      } catch (err) {
        console.error('Failed to load variables:', err);
      }
    }

    async function fetchCommands() {
      try {
        const res = await fetch(`http://104.234.236.59:30131/api/commands/${guildid}`);
        const data = await res.json();
        if (data.commands) {
          setCommands(data.commands);
        }
      } catch (err) {
        console.error('Failed to load commands:', err);
      }
    }

    async function fetchAppearance() {
      try {
        const token = Cookies.get('discord_token');
        const res = await fetch(`http://localhost:3000/api/bot-appearance/${guildid}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        const data = await res.json();
        
        if (data.success && data.appearance) {
          setAppearance({
            botNickname: data.appearance.botNickname || 'Bun Bun',
            botAvatar: data.appearance.botAvatar || '',
            botBanner: data.appearance.botBanner || '',
          });
        }
      } catch (err) {
        console.error('Failed to load appearance:', err);
      }
    }
    checkAuthentication();
  }, [guildid]);

  const ParticleBackground = () => {
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

      const particleColors = [
        'rgba(248, 185, 111, 0.1)',
        'rgba(184, 139, 74, 0.1)',
        'rgba(255, 246, 230, 0.1)',
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
                ctx.strokeStyle = `rgba(248, 185, 111, ${0.08 * (1 - distance / 80)})`;
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
    }, []);

    return (
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />
    );
  };

  const FloatingElements = () => {
    return (
      <>
        <motion.div
          className="fixed top-1/4 left-1/4 opacity-30"
          style={{ color: THEME_COLOR }}
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
          className="fixed top-3/4 right-1/4 opacity-20"
          style={{ color: THEME_COLOR }}
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
          className="fixed bottom-1/4 left-1/2 opacity-30"
          style={{ color: THEME_COLOR }}
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

  const handleVariableChange = (key: string, value: string) => {
    setVariables(prev => ({ ...prev, [key]: value }));
  };

  const handleCommandToggle = async (command: string) => {
    const newValue = !commands[command as keyof Commands];
    setCommands(prev => ({ ...prev, [command]: newValue }));

    try {
      const res = await fetch(`http://104.234.236.59:30131/api/commands/${guildid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command, enabled: newValue })
      });
      const data = await res.json();

      if (data.success) {
        showToast(`${command} ${newValue ? 'enabled' : 'disabled'}`, true);
      } else {
        showToast('Failed to update command', false);
      }
    } catch (err) {
      console.error('Error updating command:', err);
      showToast('Network or server error', false);
    }
  };

  const handleAppearanceChange = (key: string, value: string) => {
    setAppearance(prev => ({ ...prev, [key]: value }));
  };

  const saveVariables = async () => {
    try {
      const res = await fetch(`http://104.234.236.59:30131/api/variables/${guildid}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...variables,
          universeId: variables.universeId,
          apiKey: variables.robloxApiKey,
        })
      });
      const data = await res.json();

      if (data.success) {
        showToast('Variables saved successfully', true);
      } else {
        showToast(`Failed to save variables: ${data.error || 'Unknown error'}`, false);
      }
    } catch (err) {
      console.error('Error saving variables:', err);
      showToast('Network or server error', false);
    }
  };

  const saveBotAppearance = async () => {
    try {
      const token = Cookies.get('discord_token');
      if (!token) {
        showToast('You must be signed in to save appearance', false);
        return;
      }

      const res = await fetch(`http://localhost:3000/api/bot-appearance/${guildid}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          botNickname: appearance.botNickname,
          botAvatar: appearance.botAvatar,
          botBanner: appearance.botBanner || null
        })
      });

      const data = await res.json();

      if (data.success) {
        showToast('Bot appearance saved successfully', true);
        
        if (data.appearance) {
          setAppearance(data.appearance);
        }
      } else {
        showToast(`Failed to save: ${data.error || 'Unknown error'}`, false);
      }
    } catch (err) {
      console.error('Error saving bot appearance:', err);
      showToast('Network or server error', false);
    }
  };

  const resetBotAppearance = async () => {
    const token = Cookies.get('discord_token');
    if (!token) {
      showToast('You must be signed in to reset appearance', false);
      return;
    }

    const resetValues = {
      botNickname: 'Bun Bun',
      botAvatar: 'https://cdn.discordapp.com/avatars/1444622990959575060/fd834d7093de91732d390ea958647138.webp?size=1024',
      botBanner: 'https://cdn.discordapp.com/banners/1444622990959575060/a1db4b37f64d3e8dac899c7ef1d4ff03.webp?size=1024',
    };

    try {
      const res = await fetch(`http://localhost:3000/api/bot-appearance/${guildid}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resetValues),
      });

      const data = await res.json();

      if (data.success) {
        showToast('Appearance reset to default', true);
        if (data.appearance) {
          setAppearance(data.appearance);
        } else {
          setAppearance(resetValues);
        }
      } else {
        showToast(`Failed to reset: ${data.error || 'Unknown error'}`, false);
      }
    } catch (err) {
      console.error('Error resetting appearance:', err);
      showToast('Network or server error', false);
    }
  };

  if (checkingAuth || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: THEME_COLOR }}>
        <ParticleBackground />
        <FloatingElements />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-4 border-transparent relative z-10"
          style={{ borderTopColor: THEME_LIGHT, borderRightColor: THEME_LIGHT }}
        />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: THEME_COLOR }}>
        <ParticleBackground />
        <FloatingElements />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-md w-full mx-4"
        >
          <div className="rounded-3xl backdrop-blur-xl shadow-2xl p-8 text-center" style={{ backgroundColor: THEME_LIGHT, borderColor: THEME_COLOR, borderWidth: 1 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{ backgroundColor: THEME_COLOR, borderColor: THEME_DARK, borderWidth: 2 }}
            >
              <Lock size={40} style={{ color: THEME_LIGHT }} />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#3a2a13' }}>Authentication Required</h2>
            <p className="mb-6" style={{ color: THEME_DARK }}>
              You need to sign in with Discord to access this dashboard.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/api/auth/discord'}
              className="w-full px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center justify-center gap-3"
              style={{ backgroundColor: THEME_COLOR, color: 'white', borderColor: THEME_DARK, borderWidth: 1 }}
            >
              <svg width="24" height="24" viewBox="0 0 71 55" fill="none">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="white"/>
              </svg>
              Sign in with Discord
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/')}
              className="w-full mt-4 px-6 py-3 rounded-xl font-medium transition-all"
              style={{ backgroundColor: `${THEME_COLOR}20`, borderColor: THEME_COLOR, borderWidth: 1, color: '#3a2a13' }}
            >
              Go Back Home
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!hasPermission) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ backgroundColor: THEME_COLOR }}>
        <ParticleBackground />
        <FloatingElements />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-md w-full mx-4"
        >
          <div className="rounded-3xl backdrop-blur-xl shadow-2xl p-8 text-center" style={{ backgroundColor: THEME_LIGHT, borderColor: THEME_COLOR, borderWidth: 1 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
              style={{ backgroundColor: THEME_COLOR, borderColor: THEME_DARK, borderWidth: 2 }}
            >
              <Lock size={40} style={{ color: THEME_LIGHT }} />
            </motion.div>
            
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#3a2a13' }}>No Permission</h2>
            <p className="mb-6" style={{ color: THEME_DARK }}>
              You don't have permission to manage this server. You need either Administrator or Manage Server permissions.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/servers')}
              className="w-full px-6 py-3 rounded-xl font-semibold shadow-lg"
              style={{ backgroundColor: THEME_COLOR, color: 'white', borderColor: THEME_DARK, borderWidth: 1 }}
            >
              View My Servers
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                Cookies.remove('discord_token');
                window.location.reload();
              }}
              className="w-full mt-4 px-6 py-3 rounded-xl font-medium transition-all"
              style={{ backgroundColor: `${THEME_COLOR}20`, borderColor: THEME_COLOR, borderWidth: 1, color: '#3a2a13' }}
            >
              Sign Out
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'variables', name: 'Variables', icon: Key },
    { id: 'commands', name: 'Commands', icon: Bot },
    { id: 'appearance', name: 'Appearance', icon: Palette },
  ];

  const variableFields = [
    {
      id: 'logChannel',
      label: 'Log Channel',
      placeholder: 'Enter log channel ID',
      type: 'text',
      icon: FiActivity
    },
    {
      id: 'modRole',
      label: 'Moderator Role',
      placeholder: 'Enter moderator role ID',
      type: 'text',
      icon: Shield
    }
  ];

  const commandCards = [
    { id: 'ban', title: 'Ban Command', description: 'Ban users from the server', enabled: commands.ban, icon: Ban },
    { id: 'kick', title: 'Kick Command', description: 'Kick users from the server', enabled: commands.kick, icon: UserCheck },
    { id: 'warn', title: 'Warn Command', description: 'Warn users for rule violations', enabled: commands.warn, icon: AlertTriangle },
    { id: 'mute', title: 'Mute Command', description: 'Temporarily mute users', enabled: commands.mute, icon: VolumeX },
    { id: 'purge', title: 'Purge Command', description: 'Bulk delete messages', enabled: commands.purge, icon: Trash2 },
    { id: 'lockdown', title: 'Lockdown Command', description: 'Lock down the server during emergencies', enabled: commands.lockdown, icon: Lock },
    { id: 'report', title: 'Report Command', description: 'Allow users to report issues', enabled: commands.report, icon: Flag },
    { id: 'userinfo', title: 'User Info Command', description: 'Display user information', enabled: commands.userinfo, icon: FiUser }
  ];

  const sidebarVariants = { collapsed: { width: 80 }, expanded: { width: 280 } };
  const textVariants = { collapsed: { opacity: 0, scale: 0.8 }, expanded: { opacity: 1, scale: 1 } };

  return (
    <div className="min-h-screen relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: THEME_COLOR, color: '#3a2a13' }}>
      <ParticleBackground />
      <FloatingElements />
      
      <div className="fixed top-0 left-0 w-96 h-96 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-40" style={{ backgroundColor: THEME_COLOR }} />
      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-30" style={{ backgroundColor: THEME_COLOR }} />

      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl backdrop-blur-xl"
            style={{
              backgroundColor: toast.success ? THEME_COLOR : '#dc2626',
              borderColor: toast.success ? THEME_DARK : '#ef4444',
              borderWidth: 1,
              color: 'white'
            }}
          >
            {toast.success ? (
              <AiOutlineCheckCircle className="text-2xl" />
            ) : (
              <AiOutlineCloseCircle className="text-2xl" />
            )}
            <span className="font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 p-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          <motion.button 
            whileHover={{ scale: 1.1 }} 
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/servers')}
            className="backdrop-blur-xl rounded-2xl p-3 transition-all"
            style={{ backgroundColor: THEME_LIGHT, borderColor: THEME_COLOR, borderWidth: 1 }}
          >
            <ArrowLeft size={20} />
          </motion.button>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4"
          >
            <Image 
              src="/bunbun.png" 
              alt="Bun Bun Logo" 
              width={50} 
              height={50} 
              className="rounded-full shadow-2xl"
              style={{ borderColor: THEME_COLOR, borderWidth: 4 }}
            />
            <div>
              <h1 className="text-3xl font-bold">Bun Bun Dashboard</h1>
              <p style={{ color: THEME_DARK }}>Managing server: {guildid}</p>
            </div>
          </motion.div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              Cookies.remove('discord_token');
              router.push('/');
            }}
            className="ml-auto px-4 py-2 rounded-xl font-medium transition-all shadow-md"
            style={{ backgroundColor: '#b91c1c', borderColor: '#7f1d1d', borderWidth: 1, color: 'white' }}
          >
            Sign Out
          </motion.button>
        </motion.div>

        <div className="flex gap-6">
          <motion.div
            variants={sidebarVariants}
            initial="expanded"
            animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
            transition={{ type: 'spring', damping: 25 }}
            className="shrink-0 rounded-3xl backdrop-blur-xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: THEME_LIGHT, borderColor: THEME_COLOR, borderWidth: 1 }}
          >
            <div className="p-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-full flex items-center justify-center p-3 rounded-2xl mb-4 transition-all"
                style={{ backgroundColor: 'rgba(255,255,255,0.3)', borderColor: 'rgba(255,255,255,0.2)', borderWidth: 1 }}
              >
                {sidebarCollapsed ? <FiMenu size={20} /> : <FiChevronsLeft size={20} />}
              </motion.button>

              <div className="space-y-2">
                {tabs.map((tab, index) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-4 rounded-2xl transition-all group relative overflow-hidden ${
                        sidebarCollapsed ? 'justify-center' : ''
                      }`}
                      style={{
                        backgroundColor: activeTab === tab.id ? `${THEME_COLOR}40` : 'transparent',
                        borderColor: activeTab === tab.id ? THEME_COLOR : 'transparent',
                        borderWidth: 1
                      }}
                    >
                      <motion.div
                        variants={textVariants}
                        animate={sidebarCollapsed ? 'collapsed' : 'expanded'}
                        className="flex items-center gap-3 relative z-10"
                        style={{ color: THEME_DARK }}
                      >
                        <Icon size={20} />
                        {!sidebarCollapsed && <span className="font-medium">{tab.name}</span>}
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1"
          >
            <div className="rounded-3xl backdrop-blur-xl shadow-2xl p-8 relative overflow-hidden" style={{ backgroundColor: 'rgba(255,246,230,0.8)', borderColor: 'rgba(255,255,255,0.4)', borderWidth: 1 }}>
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {activeTab === 'variables' && (
                    <motion.div
                      key="variables"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Key style={{ color: THEME_DARK }} />
                        Configuration Variables
                      </h2>
                      <div className="grid gap-4 mb-6">
                        {variableFields.map((field, i) => {
                          const Icon = field.icon;
                          return (
                            <motion.div
                              key={field.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              className="rounded-2xl backdrop-blur-lg p-4"
                              style={{ backgroundColor: 'rgba(248,185,111,0.1)', borderColor: 'rgba(248,185,111,0.3)', borderWidth: 1 }}
                            >
                              <label className="flex items-center gap-3 mb-2">
                                <Icon size={20} style={{ color: THEME_DARK }} />
                                <span className="font-semibold">{field.label}</span>
                              </label>
                              <input
                                type={field.type}
                                value={variables[field.id as keyof Variables]}
                                onChange={(e) => handleVariableChange(field.id, e.target.value)}
                                placeholder={field.placeholder}
                                className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors"
                                style={{ 
                                  backgroundColor: 'rgba(255,255,255,0.5)', 
                                  borderColor: 'rgba(248,185,111,0.3)', 
                                  borderWidth: 1,
                                  color: '#3a2a13'
                                }}
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={saveVariables}
                        className="px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-3"
                        style={{ backgroundColor: THEME_COLOR, color: 'white', borderColor: THEME_DARK, borderWidth: 1 }}
                      >
                        <FiSave size={18} />
                        Save Variables
                      </motion.button>
                    </motion.div>
                  )}

                  {activeTab === 'commands' && (
                    <motion.div
                      key="commands"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Bot style={{ color: THEME_DARK }} />
                        Command Management
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {commandCards.map((command, i) => {
                          const Icon = command.icon;
                          return (
                            <motion.div
                              key={command.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2 + i * 0.1 }}
                              whileHover={{ y: -2 }}
                              className="rounded-2xl backdrop-blur-lg p-6 flex items-center justify-between transition-all group relative overflow-hidden"
                              style={{ backgroundColor: 'rgba(248,185,111,0.1)', borderColor: 'rgba(248,185,111,0.3)', borderWidth: 1 }}
                            >
                              <div className="flex items-center gap-4 relative z-10">
                                <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(248,185,111,0.2)', borderColor: 'rgba(248,185,111,0.3)', borderWidth: 1 }}>
                                  <Icon size={20} style={{ color: THEME_DARK }} />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg">{command.title}</h3>
                                  <p className="text-sm" style={{ color: THEME_DARK }}>{command.description}</p>
                                </div>
                              </div>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleCommandToggle(command.id)}
                                className="w-14 h-7 rounded-full transition-all relative"
                                style={{ backgroundColor: command.enabled ? '#10b981' : '#6b7280' }}
                              >
                                <motion.div
                                  className="w-5 h-5 rounded-full bg-white absolute top-1 shadow-lg"
                                  animate={{ left: command.enabled ? 32 : 2 }}
                                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                              </motion.button>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'appearance' && (
                    <motion.div
                      key="appearance"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <Palette style={{ color: THEME_DARK }} />
                        Bot Appearance
                      </h2>
                      <div className="grid gap-6">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="rounded-2xl backdrop-blur-lg p-6"
                          style={{ backgroundColor: 'rgba(248,185,111,0.1)', borderColor: 'rgba(248,185,111,0.3)', borderWidth: 1 }}
                        >
                          <label className="flex items-center gap-3 mb-4">
                            <FiUser style={{ color: THEME_DARK }} />
                            <span className="font-semibold text-lg">Bot Nickname</span>
                          </label>
                          <input
                            type="text"
                            value={appearance.botNickname}
                            onChange={(e) => handleAppearanceChange('botNickname', e.target.value)}
                            placeholder="Enter bot nickname"
                            className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors"
                            style={{ 
                              backgroundColor: 'rgba(255,255,255,0.5)', 
                              borderColor: 'rgba(248,185,111,0.3)', 
                              borderWidth: 1,
                              color: '#3a2a13'
                            }}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="rounded-2xl backdrop-blur-lg p-6"
                          style={{ backgroundColor: 'rgba(248,185,111,0.1)', borderColor: 'rgba(248,185,111,0.3)', borderWidth: 1 }}
                        >
                          <label className="flex items-center gap-3 mb-4">
                            <FiImage style={{ color: THEME_DARK }} />
                            <span className="font-semibold text-lg">Bot Avatar URL</span>
                          </label>
                          <input
                            type="url"
                            value={appearance.botAvatar}
                            onChange={(e) => handleAppearanceChange('botAvatar', e.target.value)}
                            placeholder="Preferably don't use a discord attachment link as they expire."
                            className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors"
                            style={{ 
                              backgroundColor: 'rgba(255,255,255,0.5)', 
                              borderColor: 'rgba(248,185,111,0.3)', 
                              borderWidth: 1,
                              color: '#3a2a13'
                            }}
                          />
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="rounded-2xl backdrop-blur-lg p-6"
                          style={{ backgroundColor: 'rgba(248,185,111,0.1)', borderColor: 'rgba(248,185,111,0.3)', borderWidth: 1 }}
                        >
                          <label className="flex items-center gap-3 mb-4">
                            <FiImage style={{ color: THEME_DARK }} />
                            <span className="font-semibold text-lg">Bot Banner URL (Optional)</span>
                          </label>
                          <input
                            type="url"
                            value={appearance.botBanner}
                            onChange={(e) => handleAppearanceChange('botBanner', e.target.value)}
                            placeholder="Enter bot banner URL (requires Premium)"
                            className="w-full rounded-xl px-4 py-3 focus:outline-none transition-colors"
                            style={{ 
                              backgroundColor: 'rgba(255,255,255,0.5)', 
                              borderColor: 'rgba(248,185,111,0.3)', 
                              borderWidth: 1,
                              color: '#3a2a13'
                            }}
                          />
                          <p className="text-xs mt-2" style={{ color: THEME_DARK }}>
                            Note: Banner requires your bot to have Premium
                          </p>
                        </motion.div>

                        <div className="flex gap-3">
                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={saveBotAppearance}
                            className="px-6 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-3 justify-center"
                            style={{ backgroundColor: THEME_COLOR, color: 'white', borderColor: THEME_DARK, borderWidth: 1 }}
                          >
                            <FiSave size={18} />
                            Save Appearance
                          </motion.button>

                          <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={resetBotAppearance}
                            className="px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 flex items-center gap-2 justify-center"
                            style={{ backgroundColor: 'transparent', color: '#3a2a13', borderColor: THEME_COLOR, borderWidth: 1 }}
                          >
                            <FiRefreshCw size={16} />
                            Reset to Default
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}