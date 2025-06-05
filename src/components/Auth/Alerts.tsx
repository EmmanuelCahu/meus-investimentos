import React from "react";

interface AlertsProps {
  error?: string;
  success?: string;
}

const Alerts: React.FC<AlertsProps> = ({ error, success }) => {
  if (!error && !success) return null;

  return (
    <div className="mb-4">
      {error && (
        <div className="rounded-md bg-red-50 p-4 text-red-700">
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="rounded-md bg-green-50 p-4 text-green-700">
          <p>{success}</p>
        </div>
      )}
    </div>
  );
};

export default Alerts;
