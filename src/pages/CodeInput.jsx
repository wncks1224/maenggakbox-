import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CodeInput() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      // 코드 유효성 검사는 나중에 추가할 수 있음
      navigate(`/reserve?code=${code}`);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">예약 코드 입력</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="코드를 입력하세요"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          좌석 선택으로 이동
        </button>
      </form>
    </div>
  );
}
