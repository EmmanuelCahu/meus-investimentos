import React from "react";

interface AuthTabsProps {
  currentTab: "login" | "signup" | "forgot" | "reset";
  onChangeTab: (tab: "login" | "signup" | "forgot" | "reset") => void;
}

const tabs = [
  { key: "login", label: "Login" },
  { key: "signup", label: "Cadastrar" },
  { key: "forgot", label: "Esqueci a Senha" },
];

const AuthTabs: React.FC<AuthTabsProps> = ({ currentTab, onChangeTab }) => {
  return (
    <div className="flex space-x-4 border-b border-gray-300 mb-6">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          type="button"
          className={`py-2 px-4 -mb-px font-semibold border-b-2 transition-colors ${
            currentTab === key
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
          onClick={() => onChangeTab(key as any)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;
