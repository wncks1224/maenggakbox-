import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import db from '../lib/firebase';

const rows = ['a', 'b'];
const cols = [1, 2, 3];

export default function ReserveSeats() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [screening, setScreening] = useState(null);
  const [usedSeats, setUsedSeats] = useState([]);
  const [params] = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    const fetchCodeInfo = async () => {
      if (!code) return;
      const codeRef = doc(db, 'codes', code);
      const codeSnap = await getDoc(codeRef);
      if (codeSnap.exists()) {
        const data = codeSnap.data();
        const screeningRef = doc(db, 'screenings', data.screeningId);
        const screeningSnap = await getDoc(screeningRef);
        if (screeningSnap.exists()) {
          const screeningData = { id: screeningSnap.id, ...screeningSnap.data() };
          setScreening(screeningData);

          // 예약된 좌석 불러오기
          const q = query(collection(db, 'codes'), where('screeningId', '==', screeningData.id));
          const qsnap = await getDocs(q);
          const seats = qsnap.docs
            .map(doc => doc.data().reservedSeat)
            .filter(seat => seat);
          setUsedSeats(seats);
        }
      }
    };
    fetchCodeInfo();
  }, [code]);

  const handleSelect = async (seat) => {
    if (usedSeats.includes(seat)) return;
    setSelectedSeat(seat);
    if (code && screening) {
      const codeRef = doc(db, 'codes', code);
      await setDoc(codeRef, {
        screeningId: screening.id,
        reservedSeat: seat,
        used: true,
      }, { merge: true });
    }
  };

  if (!screening) {
    return <p className="p-4 text-center">코드 정보를 불러오는 중...</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">좌석을 선택하세요</h1>

      <p className="text-sm text-gray-500 mb-2">
        입력한 예약 코드: <strong>{code}</strong>
      </p>
      <p className="text-sm text-gray-700 mb-4">
        🎬 {screening.movie} / {screening.date} {screening.time}
      </p>

      <div className="grid grid-cols-3 gap-2">
        {rows.map((row) =>
          cols.map((col) => {
            const seat = `${row}${col}`;
            const isSelected = selectedSeat === seat;
            const isUsed = usedSeats.includes(seat);
            return (
              <button
                key={seat}
                onClick={() => handleSelect(seat)}
                className={`rounded-xl p-4 border ${
                  isUsed ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
                  isSelected ? 'bg-blue-400 text-white' : 'bg-white'
                }`}
                disabled={isUsed}
              >
                {row.toUpperCase()}열 {col}번
              </button>
            );
          })
        )}
      </div>

      {selectedSeat && (
        <div className="mt-6 p-4 bg-gray-100 rounded-xl">
          <p className="font-medium">
            선택한 좌석:{' '}
            <strong>{selectedSeat[0].toUpperCase()}열 {selectedSeat.slice(1)}번</strong>
          </p>
        </div>
      )}
    </div>
  );
}
