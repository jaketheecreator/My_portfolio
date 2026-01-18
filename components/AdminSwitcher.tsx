'use client';

export default function AdminSwitcher() {
  const setPortfolio = (type: string) => {
    document.cookie = `portfolio-type=${type}; path=/; max-age=86400`;
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 opacity-20 hover:opacity-100 transition-opacity">
      <div className="bg-black border border-gray-800 rounded-sm p-2 flex gap-2">
        <button
          onClick={() => setPortfolio('web3')}
          className="px-3 py-1 text-xs text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700 rounded transition-colors"
        >
          View Web3
        </button>
        <button
          onClick={() => setPortfolio('web2')}
          className="px-3 py-1 text-xs text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700 rounded transition-colors"
        >
          View Web2
        </button>
        <button
          onClick={() => setPortfolio('combined')}
          className="px-3 py-1 text-xs text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700 rounded transition-colors"
        >
          View Combined
        </button>
      </div>
    </div>
  );
}
