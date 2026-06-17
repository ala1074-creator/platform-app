"use client";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center font-sans">
      <div className="bg-slate-800 p-10 rounded-3xl shadow-2xl text-center border border-slate-700">
        <h1 className="text-5xl font-bold text-teal-400 mb-8">منصة EduForge 🚀</h1>
        
        {/* الكود الجديد: إذا كان مسجلاً للدخول */}
        <Show when="signed-in">
          <p className="text-2xl mb-6">أهلاً بك يا هندسة في لوحة التحكم!</p>
          <div className="flex justify-center scale-150 mt-4">
            <UserButton />
          </div>
        </Show>

        {/* الكود الجديد: إذا كان زائراً غير مسجل */}
        <Show when="signed-out">
          <p className="text-xl mb-8 text-gray-300">يجب تسجيل الدخول للوصول إلى الكورسات وحماية الأجهزة</p>
          <SignInButton mode="modal">
            <button className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white text-lg font-bold rounded-xl transition-all shadow-lg hover:shadow-teal-500/30">
              تسجيل الدخول / إنشاء حساب
            </button>
          </SignInButton>
        </Show>
      </div>
    </div>
  );
}