
import React from 'react';

const Skeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 h-64 animate-pulse">
      <div className="flex justify-between mb-4">
        <div className="h-4 w-20 bg-slate-200 rounded"></div>
        <div className="h-4 w-16 bg-slate-100 rounded"></div>
      </div>
      <div className="h-6 w-full bg-slate-200 rounded mb-3"></div>
      <div className="h-6 w-3/4 bg-slate-200 rounded mb-6"></div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-100 rounded"></div>
        <div className="h-3 w-full bg-slate-100 rounded"></div>
        <div className="h-3 w-2/3 bg-slate-100 rounded"></div>
      </div>
    </div>
  );
};

export default Skeleton;
