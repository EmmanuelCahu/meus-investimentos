"use client";

import { useSearchParams } from "next/navigation";
import AuthContainer from "@/components/Auth/AuthContainer";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode") || undefined;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2]">
      <AuthContainer
        defaultTab="reset"
        oobCode={oobCode}
        onSuccessLogin={() => (window.location.href = "/login")}
      />
    </div>
  );
}
