"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronRight, FiCheck, FiZap, FiShield, FiCode, FiUsers, FiStar } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import { LogIn } from "lucide-react";

export default function ModernHomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#F8B96F', color: '#3a2a13' }}>
      {/* Enhanced Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-lg border-b border-white/5" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 blur-xl group-hover:bg-orange-500/30 transition"></div>
              <Image src="/bunbun.png" alt="BunBun Logo" width={40} height={40} className="relative" draggable={false} />
            </div>
            <span className="text-xl font-bold tracking-tight">BunBun</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/commands" className="text-sm text-zinc-400 hover:text-white transition-all hover:scale-105">
              Commands
            </Link>
            <Link href="/premium" className="text-sm text-zinc-400 hover:text-white transition-all hover:scale-105">
              Premium
            </Link>
            <Link href="/faq" className="text-sm text-zinc-400 hover:text-white transition-all hover:scale-105">
              FAQ
            </Link>
            <div className="flex items-center gap-3">
              <button className="relative px-6 py-2.5 rounded-lg font-medium bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25 group">
                <span className="relative z-10 flex items-center gap-2 text-sm font-semibold">
                  <Link href="/login">
                    <LogIn className="w-5 h-5 text-white/95" />
                  </Link>
                  <span>Login</span>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Animated Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>

          <div className="relative text-center">
            {/* Logo Animation */}
            <div className="mb-12 flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-linear-to-r from-orange-500 to-purple-500 rounded-full blur-xl group-hover:blur-2xl transition-all duration-1000 opacity-20"></div>
                <div className="relative animate-float">
                  <Image src="/bunbun.png" alt="BunBun Bot" width={160} height={160} draggable={false} className="drop-shadow-2xl" />
                </div>
                <div className="absolute -inset-4 border-2 border-orange-500/30 rounded-full animate-ping [animation-duration:3s]"></div>
              </div>
            </div>

            {/* Hero Text */}
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
                <IoSparklesOutline className="text-orange-500" />
                <span className="text-sm text-zinc-300">Discord's Most Versatile Bot</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
                <span className="bg-linear-to-r from-white via-white to-orange-200 bg-clip-text text-transparent">
                  Level Up
                </span>
                <br />
                <span className="bg-linear-to-r from-orange-500 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                  Your Server
                </span>
              </h1>

              <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                BunBun combines <span className="text-white font-medium">powerful moderation</span>,{" "}
                <span className="text-white font-medium">engaging entertainment</span>, and{" "}
                <span className="text-white font-medium">cutting-edge AI tools</span> in one seamless package.
                Transform your Discord experience today.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="group relative px-8 py-4 rounded-xl font-medium bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30">
                <div className="absolute -inset-0.5 bg-linear-to-r from-orange-500 to-orange-600 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                <span className="relative flex items-center justify-center gap-3">
                  Add to Discord
                  <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <Link href="/premium">
                <button className="group px-8 py-4 rounded-xl font-medium bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                  <span className="relative flex items-center justify-center gap-2">
                    <FiStar className="text-yellow-400" />
                    Explore Premium
                  </span>
                </button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center p-6 rounded-2xl bg-linear-to-b from-white/5 to-transparent border border-white/10">
                <div className="text-3xl font-bold bg-linear-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">N/A</div>
                <div className="text-sm text-zinc-400 mt-2">Active Users</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-linear-to-b from-white/5 to-transparent border border-white/10">
                <div className="text-3xl font-bold bg-linear-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">N/A</div>
                <div className="text-sm text-zinc-400 mt-2">Servers</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-linear-to-b from-white/5 to-transparent border border-white/10">
                <div className="text-3xl font-bold bg-linear-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">99.9%</div>
                <div className="text-sm text-zinc-400 mt-2">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need in{" "}
            <span className="bg-linear-to-r from-orange-500 to-yellow-400 bg-clip-text text-transparent">
              One Bot
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            From server management to entertainment, BunBun has you covered
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl border border-white/10 bg-linear-to-b from-white/5 to-transparent hover:from-white/10 transition-all duration-300 hover:scale-[1.02] hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className="absolute top-4 right-4 text-3xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all">
                {feature.icon}
              </div>
              <div className="mb-6 text-4xl">{feature.emoji}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{feature.description}</p>
              <div className="mt-6 pt-6 border-t border-white/10">
                <ul className="space-y-3">
                  {feature.points.map((point, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                      <FiCheck className="text-green-500 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Section */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-orange-500/10 via-transparent to-purple-500/10"></div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="bg-linear-to-br from-black via-black to-orange-950/20 border border-orange-500/20 rounded-3xl p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
                  <FiStar className="text-orange-400" />
                  <span className="text-sm font-medium text-orange-300">Premium</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">
                  Unlock{" "}
                  <span className="bg-linear-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                    Unlimited Power
                  </span>
                </h2>
                <p className="text-zinc-400 text-lg mb-8">
                  Get access to exclusive features, priority support, and custom commands. Take your server to the next level.
                </p>
                <ul className="space-y-4 mb-10">
                  {premiumFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                        <FiCheck className="text-orange-400" />
                      </div>
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="group px-8 py-4 rounded-xl font-medium bg-linear-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 hover:scale-105">
                  <span className="relative flex items-center justify-center gap-3">
                    Upgrade Now
                    <FiChevronRight className="group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-r from-orange-500 to-yellow-500 rounded-2xl blur-xl opacity-20"></div>
                <div className="relative bg-linear-to-b from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="space-y-6">
                    {premiumCards.map((card, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/30 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-linear-to-br from-orange-500/20 to-yellow-500/20 flex items-center justify-center">
                          {card.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{card.title}</h4>
                          <p className="text-sm text-zinc-400">{card.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
        <footer className="mt-20" style={{ borderTop: '1px solid #F8B96F88', color: '#3a2a13' }}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <Link href="/" className="flex items-center gap-3 mb-6">
                <Image src="/bunbun.png" alt="BunBun Logo" width={32} height={32} draggable={false} />
                  <span className="text-xl font-bold" style={{ color: '#3a2a13' }}>BunBun</span>
              </Link>
                <p className="text-sm" style={{ color: '#7a4a00' }}>
                  Elevating Discord experiences with powerful tools and seamless integration.
                </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
                <div className="space-y-3 text-sm" style={{ color: '#7a4a00' }}>
                <Link href="/commands" className="block hover:text-white transition">Commands</Link>
                <Link href="/premium" className="block hover:text-white transition">Premium</Link>
                <Link href="/status" className="block hover:text-white transition">Status</Link>
                <Link href="/changelog" className="block hover:text-white transition">Changelog</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
                <div className="space-y-3 text-sm" style={{ color: '#7a4a00' }}>
                <Link href="/docs" className="block hover:text-white transition">Documentation</Link>
                <Link href="/faq" className="block hover:text-white transition">FAQ</Link>
                <Link href="/community" className="block hover:text-white transition">Community</Link>
                <Link href="/blog" className="block hover:text-white transition">Blog</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
                <div className="space-y-3 text-sm" style={{ color: '#7a4a00' }}>
                <Link href="/terms" className="block hover:text-white transition">Terms</Link>
                <Link href="/privacy" className="block hover:text-white transition">Privacy</Link>
                <Link href="/support" className="block hover:text-white transition">Support</Link>
              </div>
            </div>
          </div>
          
            <div className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid #F8B96F55', color: '#7a4a00' }}>
              <div className="text-sm">
              © 2024 BunBun. All rights reserved.
            </div>
              <div className="text-sm">
              Serving 50,000+ users across 2,000+ servers
            </div>
          </div>
        </div>
      </footer>

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        body {
          font-family: 'Inter', sans-serif;
          background-color: #F8B96F;
          color: #3a2a13;
          user-select: none;
        }
      `}</style>
    </div>
  );
}

// Data arrays
const features = [
  {
    emoji: "🎮",
    icon: <FiZap />,
    title: "Fun & Games",
    description: "Keep your community engaged with interactive games, memes, and entertainment commands.",
    points: [
      "100+ minigames & activities",
      "Daily rewards & leaderboards",
      "Custom sound commands",
      "Interactive polls & quizzes"
    ]
  },
  {
    emoji: "🔒",
    icon: <FiShield />,
    title: "Powerful Moderation",
    description: "Advanced moderation tools to keep your server safe and well-organized.",
    points: [
      "Auto-moderation system",
      "Custom moderation logs",
      "Role management",
      "Spam protection"
    ]
  },
  {
    emoji: "⚡",
    icon: <FiCode />,
    title: "AI & Automation",
    description: "Intelligent features powered by cutting-edge AI technology.",
    points: [
      "Smart chat responses",
      "Image generation",
      "Custom AI assistants",
      "Automated announcements"
    ]
  }
];

const premiumFeatures = [
  "Unlimited custom commands",
  "Priority 24/7 support",
  "Advanced analytics dashboard",
  "Custom bot branding",
  "Exclusive premium features",
  "No rate limits"
];

const premiumCards = [
  {
    icon: <FiZap className="text-orange-400 text-xl" />,
    title: "Priority Processing",
    description: "Commands execute instantly"
  },
  {
    icon: <FiUsers className="text-yellow-400 text-xl" />,
    title: "VIP Support",
    description: "Direct access to our team"
  },
  {
    icon: <FiStar className="text-purple-400 text-xl" />,
    title: "Exclusive Features",
    description: "Access to beta features"
  }
];