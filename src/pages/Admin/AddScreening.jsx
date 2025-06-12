import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import db from '../../lib/firebase';

export default function AddScreening() {
  const [movies, setMovies] = useState([]);
  const [movieId, setMovieId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [dubbed, setDubbed] = useState(false);
  const [subtitle, setSubtitle] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      const querySnapshot = await getDocs(collection(db, 'movies'));
      const movieList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMovies(movieList);
    };

    fetchMovies();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (movieId && date && time) {
      const selectedMovie = movies.find(m => m.id === movieId);
      try {
        await addDoc(collection(db, 'screenings'), {
          movie: selectedMovie.title,
          movieId,
          imageName: selectedMovie.imageName || 'default.jpg',
          date,
          time,
          dubbed,
          subtitle,
          createdAt: new Date(),
        });
        setSubmitted(true);
      } catch (error) {
        console.error('상영 등록 오류:', error);
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">상영 시간 등록</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">영화 선택</label>
          <select
            value={movieId}
            onChange={(e) => setMovieId(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">선택하세요</option>
            {movies.map((movie) => (
              <option key={movie.id} value={movie.id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">날짜</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">시간</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={dubbed}
              onChange={(e) => setDubbed(e.target.checked)}
            />
            더빙
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={subtitle}
              onChange={(e) => setSubtitle(e.target.checked)}
            />
            자막
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!movieId || !date || !time}
        >
          등록
        </button>
      </form>

      {submitted && (
        <p className="mt-4 text-green-600 font-medium">상영이 등록되었습니다!</p>
      )}
    </div>
  );
}
