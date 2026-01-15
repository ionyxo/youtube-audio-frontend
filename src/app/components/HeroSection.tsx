import { motion } from "motion/react";
import { Play, Sparkles, LogOut, User } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

interface HeroSectionProps {
  youtubeUrl: string;
  setYoutubeUrl: (url: string) => void;
  onAnalyze: () => void;
  isProcessing: boolean;

  onOpenAuth: () => void;
  authLabel: string; // "Log in" или "email (plan)"
  isAuthed: boolean;
  onLogout: () => void;
}

export function HeroSection({
  youtubeUrl,
  setYoutubeUrl,
  onAnalyze,
  isProcessing,
  onOpenAuth,
  authLabel,
  isAuthed,
  onLogout,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Top Right Controls */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
        {/* Auth */}
        {!isAuthed ? (
          <button
            onClick={onOpenAuth}
            className="group px-4 py-2 rounded-xl border border-border bg-background/40 text-white hover:bg-white/10 transition flex items-center gap-2"
            title="Log in"
          >
            <User className="w-4 h-4 opacity-80 group-hover:opacity-100" />
            <span>{authLabel}</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex px-4 py-2 rounded-xl border border-border bg-background/30 text-white/90">
              {authLabel}
            </div>

            <button
              onClick={onLogout}
              className="group px-4 py-2 rounded-xl border border-border bg-background/40 text-white hover:bg-white/10 transition flex items-center gap-2"
              title="Log out"
            >
              <LogOut className="w-4 h-4 opacity-80 group-hover:opacity-100" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        )}

        {/* Instagram */}
        <a
          href="https://instagram.com/ionyxoo"
          target="_blank"
          rel="noreferrer"
          className="text-muted-foreground hover:text-primary transition"
          title="Instagram"
        >
          <FaInstagram className="w-6 h-6" />
        </a>
      </div>

      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            AI-Powered Music Analysis
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text"
        >
          Convert YouTube to WAV.
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Instantly detect BPM & Key.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Convert any YouTube track to high-quality WAV and get instant musical
          analysis.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-4 p-2 bg-card/50 backdrop-blur-sm rounded-2xl border border-border shadow-2xl">
            <input
              type="text"
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              placeholder="Paste YouTube URL here..."
              disabled={isProcessing}
              className="flex-1 px-6 py-4 bg-background/80 rounded-xl border border-border focus:border-primary/50 outline-none"
            />

            <button
              onClick={onAnalyze}
              disabled={!youtubeUrl || isProcessing}
              className="px-8 py-4 bg-gradient-to-r from-primary to-accent rounded-xl font-semibold text-primary-foreground disabled:opacity-50"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <span className="flex items-center gap-2 justify-center">
                  <Play className="w-5 h-5" fill="currentColor" />
                  Analyze & Convert
                </span>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
