import { useMemo, useState } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onAuthed: (data: { token: string; email: string; plan: string }) => void;
};

export function AuthModal({ open, onClose, onAuthed }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ backend base url (prod via Vercel env, local fallback)
  const API = useMemo(() => {
    const v = import.meta.env.VITE_API_BASE_URL;
    return (v && String(v).trim()) || "http://127.0.0.1:8000";
  }, []);

  if (!open) return null;

  const submit = async () => {
    if (!email || !password) return alert("Enter email and password");

    setLoading(true);
    try {
      const endpoint =
        mode === "login" ? `${API}/auth/login` : `${API}/auth/register`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data?.detail ?? `Auth error (${res.status})`);
        return;
      }

      onAuthed({ token: data.token, email: data.email, plan: data.plan });
      onClose();
    } catch (e: any) {
      alert("Network error. Check backend URL / CORS.");
      console.log("AUTH FETCH ERROR:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card/80 backdrop-blur-xl p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/10 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <h2 className="text-2xl font-semibold text-white mb-2">
          {mode === "login" ? "Log in" : "Create account"}
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          {mode === "login"
            ? "Welcome back. Log in to unlock limits & PRO later."
            : "Create an account to track your usage."}
        </p>

        <div className="space-y-3">
          <input
            className="w-full rounded-2xl bg-background/70 border border-border px-4 py-3 text-white outline-none focus:border-primary transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full rounded-2xl bg-background/70 border border-border px-4 py-3 text-white outline-none focus:border-primary transition"
            placeholder="Password (min 6 chars)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={submit}
            disabled={loading}
            className="w-full rounded-2xl px-4 py-3 font-semibold bg-primary text-black hover:opacity-90 transition disabled:opacity-60"
          >
            {loading
              ? "Please wait…"
              : mode === "login"
              ? "Log in"
              : "Create account"}
          </button>

          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="w-full rounded-2xl px-4 py-3 font-semibold border border-border text-white hover:bg-white/5 transition"
          >
            {mode === "login"
              ? "Need an account? Create one"
              : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
