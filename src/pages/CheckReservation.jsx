import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import db from '../lib/firebase';

export default function CheckReservation() {
  const [code, setCode] = useState('');
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);

  const handleCheck = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    try {
      const ref = doc(db, 'codes', code);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setInfo(snap.data());
      } else {
        setError('예약 코드를 찾을 수 없습니다.');
      }
    } catch (err) {
      setError('오류가 발생했습니다.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">🎟️ 예약 확인</h1>
      <form onSubmit={handleCheck} className="space-y-4">
        <input
          type="text"
          placeholder="예약 코드 입력"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          확인하기
        </button>
      </form>

      {error && <p className="mt-4 text-red-500 font-medium">{error}</p>}

      {info && (
        <div className="mt-6 bg-gray-50 p-4 rounded-xl space-y-1">
          <p><strong>🎬 영화:</strong> {info.movie || '-'}</p>
          <p><strong>🕒 시간:</strong> {info.date} {info.time}</p>
          <p>
            <strong>💺 좌석:</strong> {info.reservedSeat
              ? `${info.reservedSeat[0].toUpperCase()}열 ${info.reservedSeat.slice(1)}번`
              : '아직 선택되지 않음'}
          </p>
        </div>
      )}
    </div>
  );
}
