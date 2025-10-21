'use client';
import React from 'react';

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  iconBgColor = "bg-blue-400/20", 
  iconColor = "text-blue-600" 
}) => {
  return (
    <div className="bg-black rounded-xl shadow-sm border border-gray-600 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300">{title}</p>
          <p className="text-3xl font-bold text-gray-200 mt-1">{value}</p>
        </div>
        <div className={`w-12 h-12 ${iconBgColor} backdrop-blur-xs rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;