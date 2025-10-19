import React from "react";

const StatCard = ({ borderColor, iconColor, icon, title, value, subtitle }) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border-l-4 ${borderColor}`}
    >
      <div className="flex items-center space-x-4">
        <div className={`${iconColor}`}>{icon}</div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
