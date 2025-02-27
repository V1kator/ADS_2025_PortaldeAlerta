import React from "react";

function AlertCard({ event, description, sender }) {
  return (
    <div className="mt-3 p-4 bg-red-100/20 border-l-4 border-red-500 rounded-lg shadow-md transition-transform transform hover:scale-105 animate-fade-in">
      <h3 className="text-lg font-bold text-red-400">⚠️ {event}</h3>
      <p className="text-sm mt-1">{description}</p>
      <p className="text-xs text-gray-400 mt-2">🔴 Fonte: {sender}</p>
    </div>
  );
}

export default AlertCard;
