import React from 'react';

const pendingTasks = [
  'Firebase Storage로 이미지 업로드',
  '예약 완료 후 이동/알림 처리',
  '관리자 전용 로그인',
  '코드 발급 시 QR 생성 등',
];

export default function Dashboard() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛠️ 관리자 작업 현황</h1>
      <ul className="space-y-2 text-sm">
        {pendingTasks.map((task, i) => (
          <li key={i} className="flex items-center gap-2 text-red-600">
            <span>❌</span>
            {task}
          </li>
        ))}
      </ul>
    </div>
  );
}
