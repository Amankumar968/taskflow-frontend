import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faEnvelope, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../context/ToastContext";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      showToast("Please enter your email", "error");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, { email });
      setSent(true);
      showToast("Reset link sent to your email", "success");
    } catch (err) {
      const message = err.response?.data?.error || "Something went wrong. Please try again.";
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(156,97,54,0.10),transparent_30%),linear-gradient(135deg,#FAF7F4_0%,#F3EDE7_100%)] px-4 py-8">
      <div className="w-full max-w-md overflow-hidden rounded-[32px] border border-neutral-200/80 bg-white/90 shadow-[0_30px_80px_-20px_rgba(23,17,14,0.25)] backdrop-blur p-8">
        <Link to="/login" className="flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 mb-6">
          <FontAwesomeIcon icon={faArrowLeft} className="h-4 w-4" /> Back to login
        </Link>

        <h2 className=" text-2xl font-semibold text-neutral-900 mb-2">Reset your password</h2>
        <p className="text-sm text-neutral-500 mb-6">
          Enter your email and we'll send you a link to reset your password.
        </p>

        {sent ? (
          <div className="rounded-2xl bg-success-500/10 border border-success-500/30 p-4 text-sm text-success-500">
            Check your inbox for a reset link. It expires in 30 minutes.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">Email</label>
              <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 transition focus-within:border-primary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-100">
                <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4 text-neutral-400" />
                <input
                  type="email"
                  className="w-full border-none bg-transparent outline-none"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send reset link"}
              {!loading && <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;