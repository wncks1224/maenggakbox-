import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import db from '../lib/firebase';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [screening, setScreening] = useState(null);

  useEffect(() => {
    const fetchScreening = async () => {
      const docRef = doc(db, 'screenings', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setScreening({ id: docSnap.id, ...docSnap.data() });
      } else {
        setScreening(null);
      }
    };

    fetchScreening();
  }, [id]);

  const goToCodeInput = () => {
    navigate(`/reserve?code=`); // 예약 코드 입력 페이지로 이동
  };

  if (!screening) {
    return <p className="p-4 text-center">상영 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <img src={`/images/${screening.imageName || 'default.jpg'}`} alt={screening.movie} className="w-full h-60 object-cover rounded-lg mb-4" />
      <h1 className="text-xl font-bold mb-2">{screening.movie}</h1>
      <p className="text-gray-600 mb-2">상영 날짜: {screening.date}</p>
      <p className="text-gray-600 mb-4">상영 시간: {screening.time}</p>
      {screening.dubbed && <p className="text-sm">🎤 더빙 있음</p>}
      {screening.subtitle && <p className="text-sm">💬 자막 있음</p>}

      <button
        onClick={goToCodeInput}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        코드 입력하고 예약하기
      </button>
    </div>
  );
}
