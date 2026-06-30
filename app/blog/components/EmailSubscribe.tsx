'use client'

import { Mail } from 'lucide-react';
import { useState } from 'react'

export default function EmailSubscribe() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 5000);
    }
  };
  return (
    <>
      <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => {
              const el = document.getElementById("newsletter");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-16 h-16 rounded-none bg-tertiary-fixed text-on-tertiary-fixed border-4 border-on-surface hard-shadow flex items-center justify-center hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all cursor-pointer"
            title="Subscribe to Newsletter"
          >
            <Mail />
          </button>
        </div>
      <div className="w-full lg:w-1/2 max-w-md relative z-10">
        {subscribed ? (
          <div className="bg-surface text-on-surface border-4 border-on-surface p-6 text-center">
            <span className="label-caps text-xs font-bold text-primary block mb-2">
              SUCCESS // INKED
            </span>
            <h3 className="headline-md text-2xl uppercase mb-2">YOU ARE SUBSCRIBED!</h3>
            <p className="body-md text-on-surface-variant">
              Welcome to the journal. Look out for our next dispatch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
            <input
              className="bg-surface text-on-surface font-mono text-xs font-bold p-4 border-4 border-on-surface focus:ring-0 focus:border-on-surface focus:bg-tertiary-fixed outline-none transition-colors placeholder:text-on-surface-variant/50"
              placeholder="EMAIL@ADDRESS.COM"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="btn-brutalist bg-inverse-surface text-white font-anton text-2xl py-4 border-4 border-on-surface hard-shadow pop-hover transition-all uppercase cursor-pointer"
            >
              Subscribe Now
            </button>
          </form>
        )}
      </div>   
    </>
  );
}
