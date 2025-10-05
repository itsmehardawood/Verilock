'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function ProfileSearch() {
  const { platform } = useParams(); // facebook | instagram | linkedin
  const [username, setUsername] = useState('');
  const [results, setResults] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, platform })
      });

      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Search {platform.charAt(0).toUpperCase() + platform.slice(1)} Profiles
      </h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={`Enter ${platform} username`}
          className="border px-3 py-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {results && (
        <pre className="bg-gray-800 text-white p-4 rounded">
          {JSON.stringify(results, null, 2)}
        </pre>
      )}
    </div>
  );
}
