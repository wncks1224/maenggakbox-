import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import db from '../lib/firebase';

export default function Home() {
  const [screenings, setScreenings] = useState([]);

  useEffect(() => {
    const fetchScreenings = async () => {
      const querySnapshot = await getDocs(collection(db, 'screenings'));
      const items = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setScreenings(items);
    };

    fetchScreenings();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🎬 상영 리스트</h1>
      <div className="grid grid-cols-2 gap-4">
        {screenings.map((s) => (
          <Link
            to={`/detail/${s.id}`}
            key={s.id}
            className="block border rounded-lg overflow-hidden hover:shadow"
          >
            <img
              src={`/images/${s.imageName || 'default.jpg'}`}
              alt={s.movie || '영화'}
              className="w-full h-40 object-cover"
            />
            <div className="p-2">
              <p className="font-semibold">{s.movie}</p>
              <p className="text-sm text-gray-500">{s.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
