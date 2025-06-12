import React, { useState } from 'react';

// 임시 코드 데이터 (나중에 DB 연결 예정)
const dummyCodes = [
  {
    code: 'ABC123',
    movie: '기생충',
    time: '2025-06-15 18:00',
    seat: 'a1'
  },
  {
    code: 'XYZ789',
    movie: '기생충',
    time: '2025-06-15 18:00',
    seat: null
  },
];

export default function CodeManager() {
  const [selectedCode, setSelectedCode] = useState(null);

  const handleClick = (code) => {
    setSelectedCode(code);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">코드 관리</h1>

      <ul className="space-y-2">
        {dummyCodes.map((item) => (
          <li key={item.code}>
            <button
              onClick={() => handleClick(item)}
              className="w-full text-left p-3 border rounded hover:bg-gray-100"
            >
              코드: <strong>{item.code}</strong>
            </button>
          </li>
        ))}
      </ul>

      {selectedCode && (
        <div className="mt-6 bg-gray-50 p-4 rounded-xl">
          <h2 className="font-semibold mb-2">선택한 코드 정보</h2>
          <p><strong>영화:</strong> {selectedCode.movie}</p>
          <p><strong>시간:</strong> {selectedCode.time}</p>
          <p>
            <strong>좌석:</strong>{' '}
            {selectedCode.seat ? (
              <span>{selectedCode.seat.toUpperCase()}열 {selectedCode.seat.slice(1)}번</span>
            ) : (
              <span className="text-red-500">예약되지 않음</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
