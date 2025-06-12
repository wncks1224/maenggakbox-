import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import db from '../../lib/firebase';

export default function DeleteCode() {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCodes = async () => {
    const snap = await getDocs(collection(db, 'codes'));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setCodes(list);
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  const handleDelete = async (id) => {
    setLoading(true);
    await deleteDoc(doc(db, 'codes', id));
    await fetchCodes();
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🗑️ 예약 코드 삭제</h1>
      {codes.map((code) => (
        <div key={code.id} className="border p-3 rounded mb-3 bg-white shadow">
          <p><strong>코드:</strong> {code.id}</p>
          <p><strong>예약 좌석:</strong> {code.reservedSeat || '없음'}</p>
          <button
            onClick={() => handleDelete(code.id)}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded disabled:opacity-50"
            disabled={loading}
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}
