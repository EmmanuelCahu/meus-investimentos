import AuthContainer from "@/components/Auth/AuthContainer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f5f7fa] to-[#c3cfe2]">
      <AuthContainer
        defaultTab="login"
        onSuccessLogin={() => (window.location.href = "/dashboard")}
      />
    </div>
  );
}
