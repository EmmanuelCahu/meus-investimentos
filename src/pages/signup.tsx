"use client";

import AuthContainer from "@/components/Auth/AuthContainer";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2]">
      <AuthContainer
        defaultTab="signup"
        onSuccessLogin={() => (window.location.href = "/dashboard")}
      />
    </div>
  );
}
