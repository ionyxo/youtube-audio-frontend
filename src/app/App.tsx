import { useEffect, useState } from "react";
import { HeroSection } from "@/app/components/HeroSection";
import { ProcessingSection } from "@/app/components/ProcessingSection";
import { HowItWorks } from "@/app/components/HowItWorks";
import { UseCases } from "@/app/components/UseCases";
import { Footer } from "@/app/components/Footer";
import { AuthModal } from "@/app/components/AuthModal";

type AudioData = {
  bpm: number;
  key: string;
  duration: string;
  sampleRate: string;
  downloadUrl?: string;
};

type HistoryItem = {
  title: string;
  bpm: number;
  key: string;
  duration: string;
  sampleRate: string;
  downloadUrl: string;
  at: string;
};

type AuthState = {
  token: string;
  email: string;
  plan: string;
};

export default function App() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const [audioData, setAudioData] = useState<AudioData | null>(null);
  const [history, setHistory] = useState<Array<HistoryItem>>([]);

  const [auth, setAuth] = useState<AuthState | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  // красивое сообщение про лимит
  const [limitMessage, setLimitMessage] = useState<string | null>(null);

  // restore auth from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    const plan = localStorage.getItem("plan");
    if (token && email && plan) {
      setAuth({ token, email, plan });
    }
  }, []);

  const handleAnalyze = async () => {
    if (!youtubeUrl) return;

    // очищаем прошлые баннеры перед новой попыткой
    setLimitMessage(null);

    // если не залогинен — открываем логин
    if (!auth?.token) {
      setAuthOpen(true);
      return;
    }

    setIsProcessing(true);

    try {
      const res = await fetch("youtube-audio-backend-production.up.railway.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ url: youtubeUrl }),
      });

      const data = await res.json();
      console.log("DATA FROM API:", data);

      if (!res.ok) {
        // 401 — токен устарел / невалидный
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("email");
          localStorage.removeItem("plan");
          setAuth(null);
          setAuthOpen(true);
          return;
        }

        // 403 — лимит free → показываем красивый баннер
        if (res.status === 403) {
          setLimitMessage(
            data?.detail ?? "Daily free limit reached. Upgrade to PRO."
          );
          return;
        }

        // остальные ошибки
        alert(data?.detail ?? "Server error");
        return;
      }

      const nextAudioData: AudioData = {
        bpm: data.bpm,
        key: data.key,
        duration: data.duration ?? "—",
        sampleRate: data.sampleRate ?? "—",
        downloadUrl: data.download_url,
      };

      setAudioData(nextAudioData);

      setHistory((prev) => {
        const item: HistoryItem = {
          title: data.title ?? "YouTube audio",
          bpm: data.bpm,
          key: data.key,
          duration: data.duration ?? "—",
          sampleRate: data.sampleRate ?? "—",
          downloadUrl: data.download_url ?? "",
          at: new Date().toLocaleString(),
        };
        return [item, ...prev].slice(0, 10);
      });
    } catch (error) {
      alert("Error analyzing video. Check backend is running.");
    } finally {
      setIsProcessing(false);
    }
  };

  const authLabel = auth ? `${auth.email} (${auth.plan})` : "Log in";

  return (
    <div className="min-h-screen bg-background dark">
      <HeroSection
  youtubeUrl={youtubeUrl}
  setYoutubeUrl={setYoutubeUrl}
  onAnalyze={handleAnalyze}
  isProcessing={isProcessing}
  onOpenAuth={() => setAuthOpen(true)}
  authLabel={authLabel}
  onLogout={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("plan");
    setAuth(null);
  }}
/>

      {/* Красивый баннер лимита */}
      {limitMessage && (
        <div className="px-4 -mt-10 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-2xl">
              <div className="text-white">
                <div className="font-semibold text-lg">Free limit reached</div>
                <div className="text-sm text-muted-foreground">
                  {limitMessage}
                </div>
              </div>

              <div className="flex items-center gap-3">
              <button
  onClick={async () => {
    if (!auth?.token) {
      setAuthOpen(true);
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/payments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ plan: "pro" }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.detail ?? "Payment error");
        return;
      }

      if (data.already_pro) {
        alert("You are already PRO.");
        return;
      }

      if (data.invoice_url) {
        window.open(data.invoice_url, "_blank");
      } else {
        alert("No invoice URL returned.");
      }
    } catch (e) {
      alert("Payment server not reachable.");
    }
  }}
  className="px-5 py-3 rounded-xl bg-primary text-black font-semibold hover:opacity-90 transition"
>
  Upgrade to PRO
</button>

                <button
                  onClick={() => setLimitMessage(null)}
                  className="px-5 py-3 rounded-xl border border-border text-white hover:bg-white/5 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {(isProcessing || audioData) && (
        <ProcessingSection isProcessing={isProcessing} audioData={audioData} />
      )}

      {history.length > 0 && (
        <section className="pb-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4">
              Recent analyses
            </h2>

            <div className="space-y-3">
              {history.map((item, i) => (
                <div
                  key={i}
                  className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-4 flex items-center justify-between"
                >
                  <div className="text-white">
                    <div className="text-xs text-muted-foreground mb-1">
                      {item.at}
                    </div>
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.bpm} BPM · {item.key} · {item.duration} ·{" "}
                      {item.sampleRate}
                    </div>
                  </div>

                  <button
                    className="px-4 py-2 rounded-xl bg-primary text-black font-semibold hover:opacity-90 transition"
                    onClick={() => {
                      if (!item.downloadUrl) {
                        alert("No download link for this item.");
                        return;
                      }
                      window.open(item.downloadUrl, "_blank");
                    }}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <HowItWorks />
      <UseCases />
      <Footer />

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onAuthed={({ token, email, plan }) => {
          localStorage.setItem("token", token);
          localStorage.setItem("email", email);
          localStorage.setItem("plan", plan);
          setAuth({ token, email, plan });
        }}
      />
    </div>
  );
}