
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../context/ToastContext";
import { GoogleLogin } from "@react-oauth/google";
import PhoneAuth from "../components/PhoneAuth";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      showToast("Please enter username/email and password", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        identifier,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("name", response.data.name);
      showToast("Login successful", "success");
      navigate("/tasks");
    } catch (err) {
      const message = err.response?.data?.error || "Something went wrong. Please try again.";
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/google`, {
        credential: credentialResponse.credential,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("name", response.data.name);
      showToast("Login successful", "success");
      navigate("/tasks");
    } catch (err) {
      const message = err.response?.data?.error || "Google sign-in failed. Please try again.";
      showToast(message, "error");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(156,97,54,0.10),transparent_30%),linear-gradient(135deg,#FAF7F4_0%,#F3EDE7_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-neutral-200/80 bg-white/90 shadow-[0_30px_80px_-20px_rgba(23,17,14,0.25)] backdrop-blur">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden bg-gradient-to-br from-primary-700 via-primary-800 to-neutral-900 p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white">
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 rotate-180" />
                Back to home
              </Link>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-primary-200">Welcome back</p>
              <h1 className=" mt-3 text-4xl font-semibold text-white">Manage your work with clarity.</h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-primary-100/90">
                Keep your priorities organized, your deadlines visible, and your tasks moving forward.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 text-sm text-primary-100">
              "A calm workspace creates better focus."
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <Link to="/" className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 transition hover:text-neutral-600 lg:hidden">
                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 rotate-180" />
                Back to home
              </Link>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary-600">Task Manager</p>
              <h2 className=" mt-2 text-3xl font-semibold text-neutral-900">Sign in</h2>
              <p className="mt-2 text-sm text-neutral-500">Access your dashboard and continue planning.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Username or Email</label>
                <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 transition focus-within:border-primary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-100">
                  <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-neutral-400" />
                  <input
                    className="w-full border-none bg-transparent outline-none"
                    placeholder="Enter your username or email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Password</label>
                <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 transition focus-within:border-primary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-100">
                  <FontAwesomeIcon icon={faLock} className="h-4 w-4 text-neutral-400" />
                  <input
                    type="password"
                    className="w-full border-none bg-transparent outline-none"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-2 flex justify-end">
                  <Link to="/forgot-password" className="text-xs font-medium text-primary-600 transition hover:text-primary-700">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />}
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-400">OR</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => showToast("Google sign-in failed", "error")}
              />
            </div>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-neutral-200" />
              <span className="text-xs text-neutral-400">OR USE PHONE</span>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>

            <PhoneAuth />

            <p className="mt-6 text-center text-sm text-neutral-500">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold text-primary-600 transition hover:text-primary-700">
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;