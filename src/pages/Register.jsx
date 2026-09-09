
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLock, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "../context/ToastContext";
import { GoogleLogin } from "@react-oauth/google";
import PhoneAuth from "../components/PhoneAuth";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      showToast("Please fill in all fields", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        username,
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("name", response.data.name);
      showToast("Account created successfully", "success");
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
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(179,125,51,0.10),transparent_30%),linear-gradient(135deg,#FAF7F4_0%,#F3EDE7_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl overflow-hidden rounded-[32px] border border-neutral-200/80 bg-white/90 shadow-[0_30px_80px_-20px_rgba(23,17,14,0.25)] backdrop-blur">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden bg-gradient-to-br from-secondary-600 via-secondary-700 to-neutral-900 p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 transition hover:text-white">
                <FontAwesomeIcon icon={faArrowRight} className="h-3.5 w-3.5 rotate-180" />
                Back to home
              </Link>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-secondary-100">Start fresh</p>
              <h1 className=" mt-3 text-4xl font-semibold text-white">Create your task workspace.</h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-secondary-50/90">
                Bring structure to your plans and turn ideas into a clear, manageable workflow.
              </p>
            </div>
            <div className="rounded-3xl border border-white/15 bg-white/10 p-5 text-sm text-secondary-50">
              "Small steps, done consistently, create momentum."
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8">
              <Link to="/" className="mb-4 inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 transition hover:text-neutral-600 lg:hidden">
                <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3 rotate-180" />
                Back to home
              </Link>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-secondary-600">Task Manager</p>
              <h2 className=" mt-2 text-3xl font-semibold text-neutral-900">Create account</h2>
              <p className="mt-2 text-sm text-neutral-500">Join and start tracking your work today.</p>
            </div>

            <form onSubmit={register} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Username</label>
                <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 transition focus-within:border-secondary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-secondary-100">
                  <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-neutral-400" />
                  <input
                    className="w-full border-none bg-transparent outline-none"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Email</label>
                <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 transition focus-within:border-secondary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-secondary-100">
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

              <div>
                <label className="mb-1.5 block text-sm font-medium text-neutral-700">Password</label>
                <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 transition focus-within:border-secondary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-secondary-100">
                  <FontAwesomeIcon icon={faLock} className="h-4 w-4 text-neutral-400" />
                  <input
                    type="password"
                    className="w-full border-none bg-transparent outline-none"
                    placeholder="Choose a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-secondary-600 to-secondary-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-secondary-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? "Creating account..." : "Create account"}
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
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-secondary-600 transition hover:text-secondary-700">
                Sign in instead
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;