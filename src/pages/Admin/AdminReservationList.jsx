import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import db from '../../lib/firebase';

export default function AdminReservationList() {
  const [codes, setCodes] = useState([]);

  useEffect(() => {
    const fetchCodes = async () => {
      const snap = await getDocs(collection(db, 'codes'));
      const list = await Promise.all(
        snap.docs.map(async (docSnap) => {
          const data = docSnap.data();
          let screeningInfo = null;
          if (data.screeningId) {
            const screeningSnap = await getDoc(doc(db, 'screenings', data.screeningId));
            if (screeningSnap.exists()) {
              screeningInfo = screeningSnap.data();
            }
          }
          return {
            id: docSnap.id,
            reservedSeat: data.reservedSeat,
            used: data.used,
            movie: screeningInfo?.movie || '영화 정보 없음',
            date: screeningInfo?.date,
            time: screeningInfo?.time,
          };
        })
      );
      setCodes(list);
    };

    fetchCodes();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📋 전체 예약 코드 현황</h1>
      <div className="space-y-3">
        {codes.map((code) => (
          <div key={code.id} className="p-4 border rounded-xl bg-white shadow">
            <p><strong>코드:</strong> {code.id}</p>
            <p><strong>영화:</strong> {code.movie}</p>
            <p><strong>시간:</strong> {code.date} {code.time}</p>
            <p>
              <strong>좌석:</strong>{' '}
              {code.reservedSeat
                ? `${code.reservedSeat[0].toUpperCase()}열 ${code.reservedSeat.slice(1)}번`
                : '미예약'}
            </p>
            <p>
              <strong>상태:</strong>{' '}
              {code.used ? (
                <span className="text-green-600 font-semibold">✅ 사용됨</span>
              ) : (
                <span className="text-gray-500">미사용</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
