'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

// টাইপিং ইফেক্টের জন্য হুক
function useTypewriter(words: string[], speed = 100) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    let timeout: any;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setWordIndex((prev) => prev + 1);
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, text.length + (isDeleting ? -1 : 1)));
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed]);

  return text;
}

export default function Home() {
  const typedText = useTypewriter(['জীবন বাঁচান', 'রক্ত দিন', 'আশা ছড়ান']);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 via-white to-red-50 flex flex-col">
      
      {/* Navbar */}
      <header className="w-full max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* লোগো (৪৮x৪৮ পিক্সেল ফিক্সড সাইজ) */}
          <div className="flex items-center justify-center rounded-full border-2 border-red-500 shadow-md bg-white" style={{ width: '48px', height: '48px', overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="/logo.png" 
              alt="CBN Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>
          <span className="text-2xl font-extrabold text-red-700 tracking-wide">চৌরঙ্গী ব্লাড নেটওয়ার্ক</span>
        </div>
        <Link href="/login" className="text-sm font-bold text-gray-800 hover:text-red-600 transition">
          অ্যাডমিন লগইন
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 py-16">
        <div className="animate-bounce bg-red-200 p-5 rounded-full mb-6 shadow-lg">
          <span className="text-7xl drop-shadow-md">🩸</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          জরুরি রক্তের <span className="text-red-600">প্রয়োজন?</span>
        </h1>
        
        {/* টাইপিং স্টাইল */}
        <p className="text-2xl md:text-4xl font-bold text-red-600 mb-8 h-12">
          আমরা আছি আপনার পাশে — <span className="text-gray-800">{typedText}</span>
          <span className="animate-pulse text-red-600">|</span>
        </p>

        <p className="text-lg md:text-xl text-gray-800 font-medium mb-10 max-w-2xl">
          মাত্র কয়েক ক্লিকেই রক্তের অনুরোধ পাঠান, আমাদের স্বেচ্ছাসেবী টিম খুঁজে বের করবে সঠিক দাতা।
        </p>

        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/blood-request" className="bg-red-600 text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-red-700 hover:scale-105 transform transition duration-300">
            📢 রক্তের অনুরোধ পাঠান
          </Link>
          <Link href="/login" className="bg-white text-red-600 text-lg font-bold px-8 py-4 rounded-xl shadow-lg border-2 border-red-200 hover:bg-red-50 hover:scale-105 transform transition duration-300">
            🔐 অ্যাডমিন লগইন
          </Link>
        </div>
      </main>

      {/* How It Works */}
      <section className="w-full max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-black text-gray-900 text-center mb-12">কীভাবে কাজ করে?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center border-t-8 border-red-600 hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-5xl mb-4 animate-bounce inline-block">📝</div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">১. অনুরোধ পাঠান</h3>
            <p className="text-gray-800 font-medium">রোগীর তথ্য ও রক্তের গ্রুপ দিয়ে ফর্ম পূরণ করুন।</p>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center border-t-8 border-red-600 hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-5xl mb-4 animate-pulse inline-block">🔍</div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">২. ডোনার খুঁজুন</h3>
            <p className="text-gray-800 font-medium">আমাদের টিম স্বয়ংক্রিয়ভাবে ম্যাচিং দাতাদের খুঁজে বের করে।</p>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center border-t-8 border-red-600 hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <div className="text-5xl mb-4 animate-wiggle inline-block">🤝</div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-3">৩. রক্তদান সম্পন্ন</h3>
            <p className="text-gray-800 font-medium">দাতার সাথে যোগাযোগ করে রক্তদান সম্পন্ন করুন।</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-white py-8 border-t-2 border-gray-100">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">যোগাযোগ করুন</h2>
          <div className="flex justify-center gap-6">
            <a href="tel:+8801700000000" className="flex items-center gap-2 bg-green-100 text-green-800 px-6 py-3 rounded-full font-bold hover:bg-green-200 transition shadow">
              <span className="text-xl">📞</span> কল করুন
            </a>
            <a href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition shadow">
              <span className="text-xl">💬</span> WhatsApp
            </a>
            <a href="mailto:info@cbn.com" className="flex items-center gap-2 bg-red-100 text-red-800 px-6 py-3 rounded-full font-bold hover:bg-red-200 transition shadow">
              <span className="text-xl">✉️</span> ইমেইল
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-red-900 text-white py-6 text-center">
        <p className="font-bold">© 2026 চৌরঙ্গী ব্লাড নেটওয়ার্ক (CBN)</p>
        <p className="text-sm mt-2 text-red-200">রক্ত দিন, জীবন বাঁচান। 💖</p>
      </footer>
      
    </div>
  );
}
