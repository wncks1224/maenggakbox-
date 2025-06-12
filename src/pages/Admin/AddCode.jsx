import React, { useState } from 'react';

// 임시 상영 정보
const dummyScreenings = [
  {
    id: 'screening1',
    movie: '기생충',
    time: '2025-06-15 18:00',
  },
  {
    id: 'screening2',
    movie: '서울의 봄',
    time: '2025-06-16 14:30',
  },
];

export default function AddCode() {
  const [selected, setSelected] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [generated, setGenerated] = useState([]);

  const generateCodes = () => {
    const codes = [];
    for (let i = 0; i < quantity; i++) {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase();
      codes.push({ code, screeningId: selected });
    }
    setGenerated(codes);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">예약 코드 발급</h1>

      <label className="block mb-2">상영 선택</label>
      <select
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="">선택하세요</option>
        {dummyScreenings.map((s) => (
          <option key={s.id} value={s.id}>
            {s.movie} - {s.time}
          </option>
        ))}
      </select>

      <label className="block mb-2">좌석 수</label>
      <input
        type="number"
        value={quantity}
        min={1}
        max={6}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        className="w-full border p-2 rounded mb-4"
      />

      <button
        onClick={generateCodes}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!selected || quantity < 1}
      >
        코드 생성
      </button>

      {generated.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">발급된 코드</h2>
          <ul className="space-y-1">
            {generated.map((c, index) => (
              <li key={index} className="text-sm">
                <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                  {c.code}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
