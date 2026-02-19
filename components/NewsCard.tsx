
import React from 'react';
import { NewsItem } from '../types';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const getSourceBadgeColor = (source: string) => {
    switch (source.toLowerCase()) {
      case 'clarín': return 'bg-red-100 text-red-800 border-red-200';
      case 'la nación': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'infobae': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'página/12': return 'bg-gray-800 text-white border-gray-900';
      case 'ámbito financiero': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200 overflow-hidden flex flex-col h-full">
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getSourceBadgeColor(news.source)}`}>
            {news.source}
          </span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
            {news.category}
          </span>
        </div>
        
        <h3 className="serif text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors leading-tight">
          {news.title}
        </h3>
        
        <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {news.summary}
        </p>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <a 
            href={news.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1"
          >
            Leer noticia completa
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
