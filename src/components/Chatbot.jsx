import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faXmark, faPaperPlane, faMugHot, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { chatWithAI } from "../services/api";

function formatMessage(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const boldParts = line.split(/(\*\*[^*]+\*\*)/g);
    const rendered = boldParts.map((part, j) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={j} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={j}>{part}</span>
      )
    );

    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("• ")) {
      return (
        <li key={i} className="ml-4 list-disc">
          {boldParts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**") ? (
              <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>
            ) : (
              part.replace(/^[-•]\s*/, "")
            )
          )}
        </li>
      );
    }

    return (
      <p key={i} className={i > 0 ? "mt-1.5" : ""}>
        {rendered}
      </p>
    );
  });
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi! I can help you manage and understand your tasks. What would you like to know?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading, isOpen]);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const response = await chatWithAI(userMessage);
      const aiText = response.data.response;

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: aiText || "I couldn't generate a response. Please try again." },
      ]);
    } catch (error) {
      console.error("AI Chat Error:", error);
      console.error("Server Error:", error.response?.data);

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, I'm having trouble responding right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 flex h-[520px] w-[92vw] max-w-sm flex-col overflow-hidden rounded-[28px] border border-neutral-200/80 bg-white/95 shadow-warm-lg backdrop-blur transition-all sm:right-6 dark:border-neutral-800/80 dark:bg-neutral-950/95">
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-primary-600 to-primary-800 px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-white/15 p-2">
                <FontAwesomeIcon icon={faMugHot} className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Task AI Assistant</p>
                <p className="flex items-center gap-1 text-xs text-primary-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-success-400" />
                  Online
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-xl p-1.5 text-white/80 transition hover:bg-white/15 hover:text-white"
              aria-label="Close chat"
            >
              <FontAwesomeIcon icon={faXmark} className="h-5 w-5" />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-neutral-50/70 px-4 py-4 dark:bg-neutral-900/40"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-6 shadow-sm ${
                    msg.sender === "user"
                      ? "rounded-br-md bg-gradient-to-r from-primary-600 to-primary-700 text-white"
                      : "rounded-bl-md border border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200"
                  }`}
                >
                  {msg.sender === "ai" ? formatMessage(msg.text) : msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-500 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-500 [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-500" />
                  </span>
                  Thinking...
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 border-t border-neutral-100 bg-white px-3 py-3 dark:border-neutral-800 dark:bg-neutral-950">
            <input
              type="text"
              placeholder="Ask about your tasks..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:focus:bg-neutral-950"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
              aria-label="Send message"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-5 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-warm-lg transition hover:-translate-y-1 sm:right-6"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />
        ) : (
          <div className="relative">
            <FontAwesomeIcon icon={faMessage} className="h-6 w-6" />
            <FontAwesomeIcon icon={faWandMagicSparkles} className="absolute -right-1.5 -top-1.5 h-3.5 w-3.5 text-secondary-300" />
          </div>
        )}
      </button>
    </>
  );
}

export default Chatbot;