
import React, { useState, useEffect, useCallback } from 'react';
import { fetchNewsFromArgentina } from './services/geminiService';
import { NewsItem, Newspaper } from './types';
import NewsCard from './components/NewsCard';
import Skeleton from './components/Skeleton';

const App: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchNewsFromArgentina();
      setNews(result.news);
      setLastUpdated(new Date());
    } catch (err) {
      setError("No se pudieron cargar las noticias. Verifica tu conexión o API Key.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredNews = filter === 'all' 
    ? news 
    : news.filter(item => item.source.toLowerCase() === filter.toLowerCase());

  const sourcesList = [
    { id: 'all', name: 'Todos los Medios' },
    { id: 'Clarín', name: 'Clarín' },
    { id: 'La Nación', name: 'La Nación' },
    { id: 'Infobae', name: 'Infobae' },
    { id: 'Página/12', name: 'Página/12' },
    { id: 'Ámbito Financiero', name: 'Ámbito' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Banner */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 md:h-20 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div>
                <h1 className="serif text-2xl font-bold text-slate-900 tracking-tight">ArgenNews</h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Monitor Real-Time Argentina</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {lastUpdated && !loading && (
                <span className="hidden sm:inline text-xs text-slate-400">
                  Actualizado: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <button 
                onClick={loadNews}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-semibold hover:bg-slate-800 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                )}
                Actualizar
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {sourcesList.map(s => (
              <button
                key={s.id}
                onClick={() => setFilter(s.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === s.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8 flex items-center gap-3">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(9).fill(0).map((_, i) => <Skeleton key={i} />)
          ) : filteredNews.length > 0 ? (
            filteredNews.map((item, idx) => (
              <NewsCard key={idx} news={item} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <div className="text-slate-300 mb-4 flex justify-center">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-slate-900 mb-2">No hay noticias disponibles</h3>
              <p className="text-slate-500">Intenta actualizar la página o cambiar el filtro.</p>
            </div>
          )}
        </div>

        {/* Informational Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
          <p className="mb-2 italic serif text-lg text-slate-500">"El periodismo es, en lo externo, una profesión; en lo interno, un sacerdocio."</p>
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Clarín
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              La Nación
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Infobae
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-black"></span>
              Página/12
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Ámbito
            </span>
          </div>
          <p className="mt-8">&copy; {new Date().getFullYear()} ArgenNews AI - Datos extraídos mediante búsqueda inteligente.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
