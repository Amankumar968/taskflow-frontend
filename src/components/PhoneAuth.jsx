// components/PhoneAuth.jsx
import { useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faArrowRight, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { auth } from "../firebase";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
      });
    }
  };

  const sendOtp = async () => {
    if (!phone || phone.length < 10) {
      showToast("Please enter a valid phone number", "error");
      return;
    }

    setLoading(true);
    try {
      setupRecaptcha();
      const fullPhone = phone.startsWith("+") ? phone : `+91${phone}`;
      const result = await signInWithPhoneNumber(auth, fullPhone, window.recaptchaVerifier);
      setConfirmationResult(result);
      showToast("OTP sent to your phone", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to send OTP. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      showToast("Please enter the 6-digit OTP", "error");
      return;
    }

    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const idToken = await result.user.getIdToken();

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/phone`, { idToken });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("name", response.data.name);
      showToast("Login successful", "success");
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      showToast("Invalid OTP. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {!confirmationResult ? (
        <>
          <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 transition focus-within:border-primary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-100">
            <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-neutral-400" />
            <input
              type="tel"
              className="w-full border-none bg-transparent outline-none"
              placeholder="Enter 10-digit mobile number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={sendOtp}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
            {!loading && <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />}
          </button>
        </>
      ) : (
        <>
          <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 transition focus-within:border-primary-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-100">
            <FontAwesomeIcon icon={faShieldHalved} className="h-4 w-4 text-neutral-400" />
            <input
              type="text"
              maxLength={6}
              className="w-full border-none bg-transparent outline-none tracking-widest"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            />
          </div>
          <button
            type="button"
            onClick={verifyOtp}
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify & Sign In"}
          </button>
        </>
      )}

      <div id="recaptcha-container"></div>
    </div>
  );
}