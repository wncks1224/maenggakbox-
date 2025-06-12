import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import db from '../../lib/firebase';

export default function AddMovie() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image) return;
    setUploading(true);
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `movie-posters/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'movies'), {
        title,
        imageUrl,
        createdAt: new Date(),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('영화 업로드 실패:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">영화 추가</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">영화 제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="예: 기생충"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">이미지 업로드</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!title || !image || uploading}
        >
          {uploading ? '업로드 중...' : '추가하기'}
        </button>
      </form>

      {submitted && (
        <p className="mt-4 text-green-600 font-medium">영화가 성공적으로 추가되었습니다!</p>
      )}
    </div>
  );
}
