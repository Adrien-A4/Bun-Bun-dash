import { FiSearch, FiUsers, FiStar, FiZap, FiLock } from "react-icons/fi";
import { IoGameController, IoSparkles } from "react-icons/io5";
"use client";
import { useState, type ReactElement } from "react";
type Category = {
  id: string;
  name: string;
  icon: ReactElement;
};

type Command = {
  name: string;
  category: string;
  description: string;
  premium: boolean;
};

const categories: Category[] = [
  { id: "all", name: "All Commands", icon: <FiZap /> },
  { id: "fun", name: "Fun & Games", icon: <IoGameController /> },
  { id: "utility", name: "Utility", icon: <FiUsers /> },
  { id: "ai", name: "AI Tools", icon: <IoSparkles /> },
  { id: "premium", name: "Premium", icon: <FiStar /> },
];

const allCommands: Command[] = [
  {
    name: "/meme",
    category: "fun",
    description: "Sends a random hilarious meme",
    premium: false,
  },
  {
    name: "/8ball",
    category: "fun",
    description: "Ask the magic 8-ball a question",
    premium: false,
  },
  {
    name: "/urban",
    category: "utility",
    description: "Look up a term on Urban Dictionary",
    premium: false,
  },
  {
    name: "/poll",
    category: "utility",
    description: "Create a simple yes/no poll",
    premium: false,
  },
  {
    name: "/chat",
    category: "ai",
    description: "Talk with an AI assistant",
    premium: true,
  },
  {
    name: "/imagine",
    category: "ai",
    description: "Generate an image from a prompt",
    premium: true,
  },
  {
    name: "/roletoggle",
    category: "premium",
    description: "Advanced automated role management",
    premium: true,
  },
];

export default function CommandsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [selectedCommand, setSelectedCommand] = useState<Command | null>(null);
  const filteredCommands =
    activeFilter === "all"
      ? allCommands
      : allCommands.filter((cmd) => cmd.category === activeFilter);

  return (
    <div
      className="min-h-screen pt-24 px-6"
      style={{ background: "#F8B96F", color: "#3a2a13" }}
    >
      <div className="max-w-7xl mx-auto" style={{ color: "#3a2a13" }}>
        <div className="text-center mb-12">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ color: "#3a2a13" }}
          >
            BunBun <span style={{ color: "#b86b00" }}>Commands</span>
          </h1>
          <p className="text-xl max-w-3xl mx-auto" style={{ color: "#7a4a00" }}>
            Explore the full suite of commands. Use filters to find what you
            need.
          </p>
        </div>
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10 p-6 rounded-2xl"
          style={{ background: "#F8B96F22", border: "1px solid #F8B96F55" }}
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all ${
                  activeFilter === cat.id
                    ? "bg-linear-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 text-white"
                    : "bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10"
                }`}
              >
                <span style={{ color: "#b86b00" }}>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-auto">
            <FiSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              style={{ color: "#b86b00" }}
            />
            <input
              type="text"
              placeholder="Search commands..."
              className="pl-12 pr-4 py-3 w-full md:w-80 rounded-xl"
              style={{
                background: "#F8B96F33",
                border: "1px solid #F8B96F55",
                color: "#3a2a13",
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommands.map((cmd, index) => (
            <div
              key={index}
              onClick={() => setSelectedCommand(cmd)}
              className="group p-6 rounded-2xl cursor-pointer transition-all duration-300"
              style={{
                background: "#F8B96F44",
                border: "1px solid #F8B96F88",
                color: "#3a2a13",
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <code
                  className="text-xl font-bold"
                  style={{ color: "#b86b00" }}
                >
                  {cmd.name}
                </code>
                {cmd.premium && <FiStar style={{ color: "#b86b00" }} />}
              </div>
              <p className="text-sm mb-4" style={{ color: "#7a4a00" }}>
                {cmd.description}
              </p>
              <div className="flex justify-between items-center">
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium"
                  style={{ background: "#F8B96F", color: "#3a2a13" }}
                >
                  {categories.find((c) => c.id === cmd.category)?.name}
                </span>
                <span className="text-xs" style={{ color: "#b86b00" }}>
                  Click for details
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 text-center">
          <p style={{ color: "#7a4a00" }}>
            Currently showing{" "}
            <span style={{ color: "#3a2a13", fontWeight: 600 }}>
              {filteredCommands.length}
            </span>{" "}
            of{" "}
            <span style={{ color: "#3a2a13", fontWeight: 600 }}>
              {allCommands.length}
            </span>{" "}
            total commands.
          </p>
        </div>
      </div>
      {selectedCommand && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-6"
          style={{ background: "#F8B96Fcc" }}
          onClick={() => setSelectedCommand(null)}
        >
          <div
            className="rounded-2xl p-8 max-w-md w-full"
            style={{
              background: "#fffbe9",
              border: "1px solid #F8B96F",
              color: "#3a2a13",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <code
                  className="text-2xl font-bold"
                  style={{ color: "#b86b00" }}
                >
                  {selectedCommand.name}
                </code>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: "#F8B96F", color: "#3a2a13" }}
                  >
                    {selectedCommand.premium ? "PREMIUM" : "FREE"}
                  </span>
                  <span className="text-sm" style={{ color: "#b86b00" }}>
                    {
                      categories.find((c) => c.id === selectedCommand.category)
                        ?.name
                    }
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCommand(null)}
                style={{ color: "#b86b00" }}
              >
                ×
              </button>
            </div>
            <p className="mb-6" style={{ color: "#7a4a00" }}>
              {selectedCommand.description || "No description available."}
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm mb-1" style={{ color: "#b86b00" }}>
                  Usage
                </h4>
                <code
                  className="text-sm p-3 rounded-lg block"
                  style={{ background: "#F8B96F33", color: "#3a2a13" }}
                >
                  {selectedCommand.name} [options]
                </code>
              </div>
              <button
                className="w-full py-3 rounded-xl font-medium"
                style={{ background: "#F8B96F", color: "#3a2a13" }}
              >
                Try Command in Discord
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
