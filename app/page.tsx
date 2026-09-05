'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

function useTypewriter(words: string[], speed = 90) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentWord) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
    } else {
      timer = setTimeout(() => {
        setText(
          currentWord.substring(
            0,
            text.length + (isDeleting ? -1 : 1)
          )
        );
      }, isDeleting ? 45 : speed);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, words, speed]);

  return text;
}

function HumanPulse() {
  return (
    <div className="human-pulse">
      <div className="pulse-glow" />
      <div className="pulse-orbit pulse-orbit-one" />
      <div className="pulse-orbit pulse-orbit-two" />

      <svg
        className="ecg-background"
        viewBox="0 0 800 160"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className="ecg-track"
          d="M0 80 H110 L125 80 L142 40 L158 120 L175 80 H270 L285 80 L302 20 L320 140 L338 80 H440 L455 80 L472 45 L488 115 L505 80 H610 L625 80 L642 35 L658 125 L675 80 H800"
        />
        <path
          className="ecg-light"
          d="M0 80 H110 L125 80 L142 40 L158 120 L175 80 H270 L285 80 L302 20 L320 140 L338 80 H440 L455 80 L472 45 L488 115 L505 80 H610 L625 80 L642 35 L658 125 L675 80 H800"
        />
      </svg>

      <span className="blood-particle bp1" />
      <span className="blood-particle bp2" />
      <span className="blood-particle bp3" />
      <span className="blood-particle bp4" />
      <span className="blood-particle bp5" />
      <span className="blood-particle bp6" />

      <div className="hero-drop-wrapper">
        <div className="drop-shadow-glow" />

        <svg
          viewBox="0 0 160 190"
          className="hero-blood-drop"
          aria-label="CBN Blood Drop"
          role="img"
        >
          <defs>
            <linearGradient
              id="heroBlood"
              x1="25"
              y1="15"
              x2="135"
              y2="175"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#ff4d4d" />
              <stop offset="0.35" stopColor="#ef3030" />
              <stop offset="0.72" stopColor="#c91f2b" />
              <stop offset="1" stopColor="#8f101b" />
            </linearGradient>

            <linearGradient
              id="dropShine"
              x1="45"
              y1="25"
              x2="95"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ffffff" stopOpacity=".75" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <filter id="dropShadow">
              <feDropShadow
                dx="0"
                dy="18"
                stdDeviation="12"
                floodColor="#991b1b"
                floodOpacity=".28"
              />
            </filter>
          </defs>

          <path
            d="M80 7 C80 7 20 75 20 116 C20 151 46 178 80 178 C114 178 140 151 140 116 C140 75 80 7 80 7Z"
            fill="url(#heroBlood)"
            filter="url(#dropShadow)"
          />

          <path
            d="M80 8 C80 8 21 75 21 116 C21 151 47 177 80 177 C113 177 139 151 139 116 C139 75 80 8 80 8Z"
            fill="url(#dropShine)"
            opacity=".55"
          />

          <path
            d="M55 102 H105"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            opacity=".9"
          />

          <path
            d="M80 77 V127"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            opacity=".9"
          />

          <circle
            cx="80"
            cy="102"
            r="25"
            fill="none"
            stroke="white"
            strokeWidth="2"
            opacity=".35"
          />

          <path
            d="M53 62 C47 73 42 84 39 96"
            fill="none"
            stroke="white"
            strokeWidth="9"
            strokeLinecap="round"
            opacity=".35"
          />
        </svg>

        <div className="drop-pulse-ring" />
      </div>

      <div className="network-line line-one" />
      <div className="network-line line-two" />
      <div className="network-line line-three" />

      <span className="network-node node-one" />
      <span className="network-node node-two" />
      <span className="network-node node-three" />
      <span className="network-node node-four" />
    </div>
  );
}

export default function Home() {
  const typedText = useTypewriter([
    'জীবন বাঁচান',
    'রক্ত দিন',
    'আশা ছড়ান',
  ]);

  return (
    <div className="cbn-page">
      <header className="cbn-header">
        <div className="header-inner">
          <div className="brand">
            <div className="logo-wrap">
              <div className="logo-glow" />
              <div className="logo-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/logo.png" alt="CBN Logo" />
              </div>
            </div>

            <span className="brand-name">
              চৌরঙ্গী ব্লাড নেটওয়ার্ক
            </span>
          </div>

          <Link href="/login" className="admin-login">
            অ্যাডমিন লগইন
          </Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-background">
            <div className="red-aura aura-one" />
            <div className="red-aura aura-two" />
            <div className="red-aura aura-three" />

            <span className="bg-dot bg-dot-1" />
            <span className="bg-dot bg-dot-2" />
            <span className="bg-dot bg-dot-3" />
            <span className="bg-dot bg-dot-4" />
            <span className="bg-dot bg-dot-5" />
          </div>

          <div className="hero-content">
            <HumanPulse />

            <div className="cbn-label">
              <span className="live-dot">
                <span />
              </span>
              <span>CHOWRANGI BLOOD NETWORK</span>
            </div>

            <h1 className="hero-title">
              জরুরি রক্তের
              <span className="hero-title-red">প্রয়োজন?</span>
            </h1>

            <div className="typing-area">
              <p className="typing-text">
                আমরা আছি আপনার পাশে
                <span className="dash">—</span>
                <br className="mobile-break" />
                <span className="typed-word">
                  {typedText}
                  <span className="typing-cursor">|</span>
                </span>
              </p>
            </div>

            <p className="hero-description">
              মাত্র কয়েক ক্লিকেই রক্তের অনুরোধ পাঠান,
              আমাদের স্বেচ্ছাসেবী টিম খুঁজে বের করবে
              সঠিক দাতা।
            </p>

            <div className="hero-actions">
              <Link href="/blood-request" className="request-button">
                <span className="button-shine" />
                <span className="button-content">
                  <span className="button-icon">📢</span>
                  <span>রক্তের অনুরোধ পাঠান</span>
                </span>
              </Link>

              <Link href="/blood-donate" className="donate-button">
                <span className="button-content">
                  <span className="button-icon">🩸</span>
                  <span>রক্ত দিতে চাই</span>
                </span>
              </Link>
            </div>

            <div className="bottom-pulse">
              <div className="pulse-line" />
              <span>রক্ত দিন • জীবন বাঁচান • আশা ছড়ান</span>
            </div>
          </div>
        </section>

        <section className="how-section">
          <div className="section-inner">
            <div className="section-heading">
              <span>SIMPLE • FAST • HUMAN</span>
              <h2>কীভাবে কাজ করে?</h2>
              <div className="heading-decoration">
                <i />
                <b />
                <i />
              </div>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">01</div>
                <div className="step-icon">📝</div>
                <span className="step-label">REQUEST</span>
                <h3>১. অনুরোধ পাঠান</h3>
                <p>
                  রোগীর তথ্য ও রক্তের গ্রুপ দিয়ে
                  ফর্ম পূরণ করুন।
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">02</div>
                <div className="step-icon">🔍</div>
                <span className="step-label">MATCH</span>
                <h3>২. ডোনার খুঁজুন</h3>
                <p>
                  আমাদের টিম স্বয়ংক্রিয়ভাবে
                  ম্যাচিং দাতাদের খুঁজে বের করে।
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">03</div>
                <div className="step-icon">🤝</div>
                <span className="step-label">DONATE</span>
                <h3>৩. রক্তদান সম্পন্ন</h3>
                <p>
                  দাতার সাথে যোগাযোগ করে
                  রক্তদান সম্পন্ন করুন।
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-section">
          <div className="contact-aura" />

          <div className="contact-inner">
            <span className="contact-label">CBN SUPPORT</span>
            <h2>যোগাযোগ করুন</h2>

            <div className="contact-decoration">
              <span />
            </div>

            <div className="contact-grid">
              <a
                href="tel:+8801723654265"
                className="contact-card call"
              >
                <span className="contact-icon">📞</span>
                <span>কল করুন</span>
              </a>

              <a
                href="https://wa.me/+8801723654265"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card whatsapp"
              >
                <span className="contact-icon">💬</span>
                <span>WhatsApp</span>
              </a>

              <a
                href="mailto: cbncircle@gmail.com"
                className="contact-card email"
              >
                <span className="contact-icon">✉️</span>
                <span>ইমেইল</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="cbn-footer">
        <div className="footer-glow" />

        <div className="footer-content">
          <div className="footer-logo">🩸</div>

          <p className="footer-title">
            © 2026 চৌরঙ্গী ব্লাড নেটওয়ার্ক (CBN)
          </p>

          <p className="footer-text">
            রক্ত দিন, জীবন বাঁচান। 💖
          </p>
        </div>
      </footer>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
          scroll-padding-top: 76px;
        }

        body {
          margin: 0;
          background: #fffafa;
        }

        .cbn-page {
          min-height: 100vh;
          overflow-x: hidden;
          background: #fffafa;
          color: #111827;
        }

        /* HEADER */

        .cbn-header {
          position: sticky;
          top: 0;
          z-index: 9999;
          width: 100%;
          height: 68px;
          border-bottom: 1px solid rgba(254, 202, 202, 0.65);
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          box-shadow: 0 5px 30px rgba(127, 29, 29, 0.07);
        }

        .header-inner {
          width: 100%;
          max-width: 1152px;
          height: 100%;
          margin: auto;
          padding: 0 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .brand {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 11px;
        }

        .logo-wrap {
          position: relative;
          flex-shrink: 0;
        }

        .logo-glow {
          position: absolute;
          inset: -5px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.25);
          filter: blur(9px);
        }

        .logo-box {
          position: relative;
          width: 43px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 2px solid #ef4444;
          border-radius: 50%;
          background: white;
          box-shadow: 0 5px 20px rgba(220, 38, 38, 0.18);
        }

        .logo-box img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .brand-name {
          min-width: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #b91c1c;
          font-size: 16px;
          font-weight: 900;
          letter-spacing: -0.02em;
        }

        .admin-login {
          flex-shrink: 0;
          margin-left: 10px;
          padding: 9px 13px;
          border-radius: 999px;
          color: #374151;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.25s ease;
        }

        .admin-login:hover {
          background: #fff1f2;
          color: #dc2626;
        }

        .admin-login:active {
          transform: scale(0.95);
        }

        /* HERO */

        .hero {
          position: relative;
          min-height: calc(100svh - 68px);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 38px 20px 55px;
          background:
            radial-gradient(
              circle at 50% 20%,
              rgba(254, 226, 226, 0.7),
              transparent 34%
            ),
            linear-gradient(180deg, #fffafa 0%, #ffffff 55%, #fff7f7 100%);
        }

        .hero-background {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .red-aura {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        .aura-one {
          width: 300px;
          height: 300px;
          left: 50%;
          top: 2%;
          transform: translateX(-50%);
          background: rgba(248, 113, 113, 0.18);
          animation: auraBreath 7s ease-in-out infinite;
        }

        .aura-two {
          width: 300px;
          height: 300px;
          left: -160px;
          top: 35%;
          background: rgba(254, 202, 202, 0.35);
          animation: auraMove 10s ease-in-out infinite;
        }

        .aura-three {
          width: 330px;
          height: 330px;
          right: -180px;
          top: 48%;
          background: rgba(254, 202, 202, 0.3);
          animation: auraMove 12s ease-in-out infinite reverse;
        }

        .bg-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ef4444;
          opacity: 0.2;
          animation: bgDotFloat 6s ease-in-out infinite;
        }

        .bg-dot-1 { left: 9%; top: 21%; }
        .bg-dot-2 { left: 16%; top: 65%; animation-delay: 1s; }
        .bg-dot-3 { right: 10%; top: 28%; animation-delay: 2s; }
        .bg-dot-4 { right: 17%; top: 70%; animation-delay: 3s; }
        .bg-dot-5 { left: 50%; top: 9%; animation-delay: 1.5s; }

        .hero-content {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 760px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 0;
        }

        /* HUMAN PULSE */

        .human-pulse {
          position: relative;
          width: min(100%, 500px);
          height: 215px;
          flex: 0 0 215px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0;
          isolation: isolate;
          contain: layout paint;
        }

        .pulse-glow {
          position: absolute;
          width: 145px;
          height: 145px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.18);
          filter: blur(38px);
          animation: pulseGlow 2.8s ease-in-out infinite;
        }

        .pulse-orbit {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(239, 68, 68, 0.2);
          pointer-events: none;
        }

        .pulse-orbit-one {
          width: 185px;
          height: 185px;
          animation: orbitOne 16s linear infinite;
        }

        .pulse-orbit-two {
          width: 215px;
          height: 215px;
          border-style: dashed;
          opacity: 0.5;
          animation: orbitTwo 24s linear infinite reverse;
        }

        .ecg-background {
          position: absolute;
          left: -20%;
          width: 140%;
          height: 125px;
          top: 50%;
          transform: translateY(-50%);
          opacity: 0.17;
        }

        .ecg-track {
          fill: none;
          stroke: #dc2626;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .ecg-light {
          fill: none;
          stroke: #ef4444;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 80 720;
          stroke-dashoffset: 0;
          animation: ecgTravel 3.2s linear infinite;
          opacity: 0.85;
        }

        .hero-drop-wrapper {
          position: relative;
          width: 145px;
          height: 175px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          animation: heroDropFloat 4s ease-in-out infinite;
          will-change: transform;
        }

        .drop-shadow-glow {
          position: absolute;
          width: 105px;
          height: 125px;
          border-radius: 50%;
          background: rgba(220, 38, 38, 0.3);
          filter: blur(28px);
          animation: dropGlow 2.8s ease-in-out infinite;
        }

        .hero-blood-drop {
          position: relative;
          width: 125px;
          height: 155px;
          overflow: visible;
        }

        .drop-pulse-ring {
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 50%;
          animation: dropRing 2.8s ease-out infinite;
        }

        .network-line {
          position: absolute;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(220, 38, 38, 0.35),
            transparent
          );
          transform-origin: center;
          z-index: 2;
        }

        .line-one {
          width: 100px;
          left: 29px;
          top: 92px;
          transform: rotate(-28deg);
        }

        .line-two {
          width: 105px;
          right: 25px;
          top: 88px;
          transform: rotate(29deg);
        }

        .line-three {
          width: 80px;
          left: 50%;
          bottom: 22px;
          transform: translateX(-50%) rotate(90deg);
        }

        .network-node {
          position: absolute;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.7);
          z-index: 4;
          animation: nodePulse 2.5s ease-in-out infinite;
        }

        .node-one { left: 23px; top: 66px; }
        .node-two { right: 19px; top: 64px; animation-delay: 0.7s; }
        .node-three {
          left: 50%;
          bottom: 5px;
          margin-left: -3.5px;
          animation-delay: 1.4s;
        }
        .node-four {
          left: 50%;
          top: 5px;
          transform: translateX(-50%);
          animation-delay: 2s;
        }

        .blood-particle {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #ef4444;
          box-shadow: 0 0 12px rgba(239, 68, 68, 0.6);
          opacity: 0;
          animation: bloodParticle 4s ease-in-out infinite;
        }

        .bp1 { left: 18%; top: 50%; animation-delay: 0s; }
        .bp2 { left: 25%; top: 35%; animation-delay: 0.8s; }
        .bp3 { right: 18%; top: 48%; animation-delay: 1.6s; }
        .bp4 { right: 25%; top: 34%; animation-delay: 2.4s; }
        .bp5 { left: 35%; top: 18%; animation-delay: 1.2s; }
        .bp6 { right: 35%; top: 20%; animation-delay: 2.8s; }

        /* TEXT */

        .cbn-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border: 1px solid rgba(254, 202, 202, 0.8);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          color: #dc2626;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.2em;
          box-shadow: 0 7px 25px rgba(127, 29, 29, 0.05);
          backdrop-filter: blur(12px);
          animation: contentReveal 0.8s ease both;
        }

        .live-dot {
          position: relative;
          width: 7px;
          height: 7px;
          display: inline-flex;
        }

        .live-dot::before {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          background: rgba(239, 68, 68, 0.3);
          animation: ping 1.6s infinite;
        }

        .live-dot span {
          position: relative;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #dc2626;
        }

        .hero-title {
          margin: 20px 0 0;
          color: #111827;
          font-size: clamp(38px, 10vw, 62px);
          line-height: 1.05;
          font-weight: 950;
          letter-spacing: -0.055em;
          animation: contentReveal 0.9s 0.1s ease both;
        }

        .hero-title-red {
          position: relative;
          display: inline-block;
          margin-left: 8px;
          color: #dc2626;
        }

        .hero-title-red::after {
          content: '';
          position: absolute;
          left: 2px;
          right: 2px;
          bottom: -5px;
          height: 5px;
          border-radius: 999px;
          background: #fecaca;
        }

        .typing-area {
          min-height: 83px;
          margin-top: 18px;
          animation: contentReveal 0.9s 0.2s ease both;
        }

        .typing-text {
          margin: 0;
          color: #dc2626;
          font-size: clamp(21px, 5.5vw, 34px);
          line-height: 1.45;
          font-weight: 800;
        }

        .dash {
          color: #9ca3af;
          margin-left: 5px;
        }

        .typed-word {
          position: relative;
          display: inline-block;
          min-width: 125px;
          color: #111827;
        }

        .typing-cursor {
          display: inline-block;
          margin-left: 3px;
          color: #dc2626;
          font-weight: 300;
          animation: cursorBlink 0.8s steps(1) infinite;
        }

        .hero-description {
          max-width: 590px;
          margin: 8px 0 0;
          color: #6b7280;
          font-size: 15px;
          line-height: 1.85;
          font-weight: 600;
          animation: contentReveal 0.9s 0.3s ease both;
        }

        /* BUTTONS */

        .hero-actions {
          width: 100%;
          max-width: 550px;
          display: flex;
          gap: 12px;
          margin-top: 27px;
          animation: contentReveal 0.9s 0.4s ease both;
        }

        .request-button,
        .donate-button {
          position: relative;
          flex: 1;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 18px;
          text-decoration: none;
          font-size: 16px;
          font-weight: 900;
          transition:
            transform 0.25s ease,
            box-shadow 0.3s ease;
        }

        .request-button {
          background: linear-gradient(
            135deg,
            #ef4444,
            #dc2626 55%,
            #991b1b
          );
          color: white;
          box-shadow: 0 13px 32px rgba(220, 38, 38, 0.28);
        }

        .request-button:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 42px rgba(220, 38, 38, 0.38);
        }

        .request-button:active,
        .donate-button:active {
          transform: scale(0.97);
        }

        .donate-button {
          border: 2px solid #16a34a;
          background: rgba(255, 255, 255, 0.9);
          color: #15803d;
          box-shadow: 0 10px 25px rgba(22, 163, 74, 0.09);
        }

        .donate-button:hover {
          transform: translateY(-4px);
          background: #16a34a;
          color: white;
          box-shadow: 0 18px 38px rgba(22, 163, 74, 0.22);
        }

        .button-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .button-icon {
          font-size: 19px;
        }

        .button-shine {
          position: absolute;
          inset: 0;
          width: 45%;
          transform: translateX(-180%) skewX(-20deg);
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: buttonShine 4s ease-in-out infinite;
        }

        .bottom-pulse {
          width: 100%;
          margin-top: 25px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #9ca3af;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: 0.16em;
          animation: contentReveal 0.9s 0.5s ease both;
        }

        .pulse-line {
          position: relative;
          width: 100%;
          max-width: 350px;
          height: 16px;
          overflow: hidden;
          opacity: 0.65;
        }

        .pulse-line::before {
          content: '';
          position: absolute;
          left: -100%;
          top: 50%;
          width: 200%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #fecaca 20%,
            #ef4444 28%,
            #fecaca 36%,
            transparent 50%
          );
          animation: pulseTravel 3s linear infinite;
        }

        /* HOW IT WORKS */

        .how-section {
          position: relative;
          overflow: hidden;
          padding: 72px 20px;
          background: white;
        }

        .how-section::before {
          content: '';
          position: absolute;
          left: 50%;
          top: -100px;
          width: 500px;
          height: 220px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: rgba(254, 226, 226, 0.6);
          filter: blur(80px);
        }

        .section-inner {
          position: relative;
          max-width: 1152px;
          margin: auto;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 42px;
        }

        .section-heading > span {
          color: #ef4444;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.25em;
        }

        .section-heading h2 {
          margin: 10px 0 0;
          color: #111827;
          font-size: 32px;
          line-height: 1.15;
          font-weight: 950;
          letter-spacing: -0.04em;
        }

        .heading-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 15px;
        }

        .heading-decoration i {
          width: 30px;
          height: 2px;
          background: #fecaca;
        }

        .heading-decoration b {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #dc2626;
        }

        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .step-card {
          position: relative;
          overflow: hidden;
          padding: 31px 25px;
          border: 1px solid #fee2e2;
          border-radius: 28px;
          background: linear-gradient(145deg, #ffffff, #fffafa);
          text-align: center;
          box-shadow: 0 13px 40px rgba(127, 29, 29, 0.07);
          transition:
            transform 0.45s ease,
            box-shadow 0.45s ease,
            border-color 0.45s ease;
        }

        .step-card::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            #991b1b,
            #ef4444,
            #991b1b
          );
          transform: scaleX(0.15);
          transition: transform 0.45s ease;
        }

        .step-card:hover {
          transform: translateY(-9px);
          border-color: #fecaca;
          box-shadow: 0 25px 55px rgba(127, 29, 29, 0.13);
        }

        .step-card:hover::before {
          transform: scaleX(1);
        }

        .step-number {
          position: absolute;
          top: -5px;
          right: 14px;
          color: rgba(220, 38, 38, 0.045);
          font-size: 76px;
          line-height: 1;
          font-weight: 950;
        }

        .step-icon {
          position: relative;
          z-index: 2;
          width: 78px;
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 19px;
          border-radius: 23px;
          background: linear-gradient(145deg, #fff1f2, #ffe4e6);
          font-size: 34px;
          box-shadow:
            inset 0 1px 0 white,
            0 10px 25px rgba(220, 38, 38, 0.08);
          transition: transform 0.45s ease;
        }

        .step-card:hover .step-icon {
          transform: translateY(-5px) scale(1.08) rotate(-2deg);
        }

        .step-label {
          color: #ef4444;
          font-size: 9px;
          font-weight: 950;
          letter-spacing: 0.22em;
        }

        .step-card h3 {
          margin: 8px 0 0;
          color: #111827;
          font-size: 20px;
          font-weight: 950;
        }

        .step-card p {
          margin: 10px 0 0;
          color: #6b7280;
          font-size: 14px;
          line-height: 1.7;
          font-weight: 600;
        }

        /* CONTACT */

        .contact-section {
          position: relative;
          overflow: hidden;
          padding: 62px 20px;
          border-top: 1px solid #f3f4f6;
          background: #fffafa;
        }

        .contact-aura {
          position: absolute;
          left: 50%;
          top: -80px;
          width: 380px;
          height: 220px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: rgba(254, 202, 202, 0.3);
          filter: blur(80px);
        }

        .contact-inner {
          position: relative;
          max-width: 900px;
          margin: auto;
          text-align: center;
        }

        .contact-label {
          color: #ef4444;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.25em;
        }

        .contact-inner h2 {
          margin: 9px 0 0;
          color: #111827;
          font-size: 30px;
          font-weight: 950;
          letter-spacing: -0.04em;
        }

        .contact-decoration {
          width: 40px;
          height: 4px;
          margin: 14px auto 28px;
          border-radius: 999px;
          background: #fecaca;
        }

        .contact-decoration span {
          display: block;
          width: 15px;
          height: 100%;
          margin: auto;
          border-radius: inherit;
          background: #dc2626;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .contact-card {
          min-height: 59px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 18px;
          text-decoration: none;
          font-size: 15px;
          font-weight: 900;
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-4px);
        }

        .contact-card.call {
          background: #ecfdf5;
          color: #15803d;
          box-shadow: 0 8px 22px rgba(22, 163, 74, 0.07);
        }

        .contact-card.call:hover {
          background: #dcfce7;
        }

        .contact-card.whatsapp {
          background: #22c55e;
          color: white;
          box-shadow: 0 10px 25px rgba(34, 197, 94, 0.2);
        }

        .contact-card.whatsapp:hover {
          background: #16a34a;
        }

        .contact-card.email {
          background: #fff1f2;
          color: #b91c1c;
          box-shadow: 0 8px 22px rgba(220, 38, 38, 0.07);
        }

        .contact-card.email:hover {
          background: #ffe4e6;
        }

        .contact-icon {
          font-size: 20px;
          transition: transform 0.3s ease;
        }

        .contact-card:hover .contact-icon {
          transform: scale(1.15);
        }

        /* FOOTER */

        .cbn-footer {
          position: relative;
          overflow: hidden;
          padding: 35px 20px;
          background: linear-gradient(
            145deg,
            #450a0a,
            #7f1d1d,
            #450a0a
          );
          color: white;
          text-align: center;
        }

        .footer-glow {
          position: absolute;
          left: 50%;
          top: -70px;
          width: 300px;
          height: 150px;
          transform: translateX(-50%);
          border-radius: 50%;
          background: rgba(248, 113, 113, 0.18);
          filter: blur(60px);
        }

        .footer-content {
          position: relative;
        }

        .footer-logo {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: auto;
          border: 1px solid rgba(252, 165, 165, 0.3);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          font-size: 23px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          animation: footerPulse 3s ease-in-out infinite;
        }

        .footer-title {
          margin: 15px 0 0;
          font-size: 13px;
          font-weight: 900;
        }

        .footer-text {
          margin: 7px 0 0;
          color: #fecaca;
          font-size: 12px;
          font-weight: 600;
        }

        /* ANIMATIONS */

        @keyframes heroDropFloat {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(1deg);
          }
        }

        @keyframes dropGlow {
          0%, 100% {
            transform: scale(0.9);
            opacity: 0.45;
          }
          50% {
            transform: scale(1.12);
            opacity: 0.8;
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            transform: scale(0.85);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.15);
            opacity: 0.7;
          }
        }

        @keyframes dropRing {
          0% {
            transform: scale(0.7);
            opacity: 0.7;
          }
          80%, 100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }

        @keyframes orbitOne {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes orbitTwo {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes ecgTravel {
          from { stroke-dashoffset: 800; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes nodePulse {
          0%, 100% {
            transform: scale(0.7);
            opacity: 0.25;
          }
          50% {
            transform: scale(1.45);
            opacity: 1;
          }
        }

        @keyframes bloodParticle {
          0% {
            transform: translate(0, 0) scale(0.5);
            opacity: 0;
          }
          25% {
            opacity: 0.65;
          }
          70% {
            opacity: 0.25;
          }
          100% {
            transform: translate(35px, -35px) scale(1.25);
            opacity: 0;
          }
        }

        @keyframes auraBreath {
          0%, 100% {
            transform: translateX(-50%) scale(0.9);
            opacity: 0.4;
          }
          50% {
            transform: translateX(-50%) scale(1.15);
            opacity: 0.75;
          }
        }

        @keyframes auraMove {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(35px, -25px);
          }
        }

        @keyframes bgDotFloat {
          0%, 100% {
            transform: translateY(0) scale(0.8);
            opacity: 0.15;
          }
          50% {
            transform: translateY(-25px) scale(1.5);
            opacity: 0.55;
          }
        }

        @keyframes cursorBlink {
          0%, 45% { opacity: 1; }
          46%, 100% { opacity: 0; }
        }

        @keyframes buttonShine {
          0%, 55% {
            transform: translateX(-180%) skewX(-20deg);
          }
          75%, 100% {
            transform: translateX(300%) skewX(-20deg);
          }
        }

        @keyframes pulseTravel {
          from { transform: translateX(0); }
          to { transform: translateX(50%); }
        }

        @keyframes contentReveal {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ping {
          0% {
            transform: scale(0.5);
            opacity: 0.7;
          }
          80%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes footerPulse {
          0%, 100% { transform: scale(0.92); }
          50% { transform: scale(1.08); }
        }

        /* MOBILE */

        @media (max-width: 640px) {
          .cbn-header {
            height: 64px;
          }

          .header-inner {
            padding: 0 13px;
          }

          .logo-box {
            width: 40px;
            height: 40px;
          }

          .brand {
            gap: 9px;
          }

          .brand-name {
            max-width: calc(100vw - 145px);
            font-size: 14px;
          }

          .admin-login {
            padding: 8px 9px;
            font-size: 11px;
          }

          .hero {
            min-height: auto;
            padding: 18px 17px 42px;
          }

          .human-pulse {
            width: 100%;
            height: 184px;
            flex-basis: 184px;
          }

          .hero-drop-wrapper {
            transform: none;
            scale: 0.88;
          }

          .ecg-background {
            width: 175%;
            left: -37.5%;
            height: 105px;
          }

          .network-line {
            opacity: 0.65;
          }

          .line-one {
            left: 2px;
          }

          .line-two {
            right: 0;
          }

          .cbn-label {
            padding: 7px 11px;
            font-size: 7.5px;
            letter-spacing: 0.16em;
          }

          .hero-title {
            margin-top: 16px;
            font-size: 38px;
          }

          .hero-title-red {
            margin-left: 5px;
          }

          .typing-area {
            min-height: 75px;
            margin-top: 14px;
          }

          .typing-text {
            font-size: 21px;
          }

          .hero-description {
            max-width: 340px;
            margin-top: 3px;
            font-size: 13px;
            line-height: 1.8;
          }

          .hero-actions {
            max-width: 390px;
            flex-direction: column;
            gap: 10px;
            margin-top: 22px;
          }

          .request-button,
          .donate-button {
            min-height: 57px;
            border-radius: 17px;
            font-size: 15px;
          }

          .bottom-pulse {
            margin-top: 20px;
            font-size: 7.5px;
            letter-spacing: 0.12em;
          }

          .how-section {
            padding: 60px 17px;
          }

          .section-heading {
            margin-bottom: 32px;
          }

          .section-heading h2 {
            font-size: 29px;
          }

          .steps-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .step-card {
            padding: 27px 22px;
            border-radius: 25px;
          }

          .step-icon {
            width: 70px;
            height: 70px;
            margin-bottom: 16px;
            font-size: 31px;
          }

          .step-card h3 {
            font-size: 19px;
          }

          .step-card p {
            font-size: 13.5px;
          }

          .contact-section {
            padding: 55px 17px;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .contact-card {
            min-height: 57px;
          }

          .cbn-footer {
            padding: 32px 17px;
          }
        }

        @media (max-width: 380px) {
          .brand-name {
            font-size: 13px;
          }

          .admin-login {
            font-size: 10px;
            padding-left: 7px;
            padding-right: 7px;
          }

          .human-pulse {
            height: 170px;
            flex-basis: 170px;
          }

          .hero-drop-wrapper {
            scale: 0.78;
          }

          .hero-title {
            font-size: 34px;
          }

          .typing-text {
            font-size: 19px;
          }

          .hero-description {
            font-size: 12.5px;
          }
        }

        @media (max-width: 640px) {
          .hero-content {
            overflow: visible;
          }

          .hero-title,
          .typing-area,
          .hero-description,
          .hero-actions,
          .bottom-pulse {
            width: 100%;
          }

          .hero-title {
            white-space: normal;
          }

          .typing-area {
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .hero-actions {
            flex-shrink: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </div>
  );
}
