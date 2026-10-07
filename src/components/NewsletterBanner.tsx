"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, Bell, ArrowRight } from "lucide-react";
import { subscribeNewsletter } from "@/lib/firebase";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await subscribeNewsletter(email);
      if (res.success) {
        setStatus("success");
        setMessage("Thank you. You are now subscribed to the CodeNexon newsletter.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("We could not save your subscription. Please try again in a moment.");
      }
    } catch {
      setStatus("error");
      setMessage("Failed to subscribe. Please try again.");
    }
  };

  return (
    <section className="bg-neutral-100 dark:bg-neutral-800/80 border-t border-b border-neutral-300 dark:border-neutral-700 py-10" id="newsletter">
      <div className="max-w-7xl mx-auto px-4">
        <div className="border-4 border-red-600 bg-white dark:bg-neutral-900 p-4 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info (7 cols) */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-widest mb-1.5">
                <Bell className="w-4 h-4" />
                <span>The CodeNexon Newsletter</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black font-serif text-neutral-950 dark:text-white leading-tight">
                New Guides and Price Changes, Sent When There Is Something Worth Reading.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-2 font-sans">
                One email when a new guide goes live or when a host or tool changes its pricing. No daily sends and no sponsored blasts.
              </p>
            </div>

            {/* Right Form (5 cols) */}
            <div className="lg:col-span-5">
              {status === "success" ? (
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded text-xs flex items-start gap-2.5">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                  <div>
                    <strong className="block font-bold">Subscription confirmed</strong>
                    <span>{message}</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-none focus:outline-none focus:border-red-600"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold uppercase tracking-wider text-xs px-5 py-2.5 transition flex items-center justify-center gap-1.5 shrink-0"
                    >
                      <span>{status === "submitting" ? "Subscribing..." : "Subscribe"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  {status === "error" && (
                    <p className="text-xs text-red-600 dark:text-red-400">{message}</p>
                  )}
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                    You can unsubscribe at any time with one click.
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
