"use client";

import AuthContainer from "@/components/Auth/AuthContainer";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2]">
      <AuthContainer
        defaultTab="forgot"
        onSuccessLogin={() => (window.location.href = "/login")}
      />
    </div>
  );
}
