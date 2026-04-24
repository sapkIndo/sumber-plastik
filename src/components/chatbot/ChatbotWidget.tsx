"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Halo! 👋 Saya asisten virtual **Sumber Plastik**. Ada yang bisa saya bantu seputar produk atau layanan kami?",
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen((v) => {
      if (!v) setHasNotification(false);
      return !v;
    });
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const loadingMessages = [
    "Mencari informasi produk kami...",
    "Menyiapkan jawaban terbaik...",
    "Mengecek detail untuk Anda...",
  ];

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingMsgIdx((i) => (i + 1) % loadingMessages.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [isLoading, loadingMessages.length]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!res.ok) throw new Error("Server error");

      const data: Message = await res.json();
      setMessages((prev) => [...prev, data]);
    } catch {
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl shadow-black/50 transition-all duration-300 ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "pointer-events-none translate-y-4 opacity-0 scale-95"
        }`}
        role="dialog"
        aria-label="Chat dengan asisten Sumber Plastik"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/15">
              <Bot size={15} className="text-orange-500" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Asisten Sumber Plastik</p>
              <p className="text-xs text-neutral-500">Powered by Gemini AI</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-neutral-500 transition-colors hover:bg-neutral-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
            aria-label="Tutup chat"
          >
            <X size={15} />
          </button>
        </div>

        {/* Messages */}
        <div
          className="h-80 space-y-4 overflow-y-auto p-4"
          role="log"
          aria-live="polite"
          aria-label="Riwayat percakapan"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-br-sm bg-orange-500 text-white"
                    : "rounded-bl-sm bg-neutral-800 text-neutral-200"
                }`}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => <p className="mb-0">{children}</p>,
                    strong: ({ children }) => (
                      <strong className="font-semibold text-white">{children}</strong>
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start" aria-label="Asisten sedang mengetik">
              <div className="rounded-2xl rounded-bl-sm bg-neutral-800 px-4 py-3">
                <p className="mb-1.5 text-xs text-neutral-500">{loadingMessages[loadingMsgIdx]}</p>
                <div className="flex items-center gap-1" aria-hidden="true">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-500"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-neutral-800 bg-neutral-900 p-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, 500))}
                onKeyDown={handleKeyDown}
                placeholder="Tanya seputar produk kami..."
                className="w-full rounded-xl bg-neutral-800 px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 outline-none transition-all focus:ring-1 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isLoading}
                aria-label="Ketik pesan"
                maxLength={500}
              />
              {input.length > 400 && (
                <span
                  className={`pointer-events-none absolute bottom-1 right-2 text-[10px] tabular-nums ${
                    input.length >= 500 ? "text-red-400" : "text-neutral-500"
                  }`}
                  aria-live="polite"
                >
                  {input.length}/500
                </span>
              )}
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white transition-all hover:bg-orange-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
              aria-label="Kirim pesan"
            >
              <Send size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500 shadow-lg shadow-orange-500/30 transition-[background-color,transform] duration-150 ease-out hover:bg-orange-400 hover:scale-110 active:scale-[0.93] relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
        aria-label={isOpen ? "Tutup chat" : "Buka chat asisten"}
        aria-expanded={isOpen}
      >
        {hasNotification && !isOpen && (
          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-300 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-orange-400 ring-2 ring-neutral-950" />
          </span>
        )}
        <span
          className={`absolute transition-[transform,opacity] duration-200 ease-out ${
            isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
          aria-hidden="true"
        >
          <MessageCircle size={22} className="text-white" />
        </span>
        <span
          className={`absolute transition-[transform,opacity] duration-200 ease-out ${
            isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          aria-hidden="true"
        >
          <X size={22} className="text-white" />
        </span>
      </button>
    </>
  );
}
