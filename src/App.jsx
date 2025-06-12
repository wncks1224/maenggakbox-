import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Reserve from './pages/Reserve';
import CheckReservation from './pages/CheckReservation';
import AdminLogin from './pages/Admin/AdminLogin';
import Dashboard from './pages/Admin/Dashboard';
import AddMovie from './pages/Admin/AddMovie';
import AddScreening from './pages/Admin/AddScreening';
import AddCode from './pages/Admin/AddCode';
import CodeManager from './pages/Admin/CodeManager';
import AdminReservationList from './pages/Admin/AdminReservationList';
import DeleteCode from './pages/Admin/DeleteCode';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 사용자 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/check" element={<CheckReservation />} />

        {/* 관리자 페이지 */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/add-movie" element={<AddMovie />} />
        <Route path="/admin/add-screening" element={<AddScreening />} />
        <Route path="/admin/add-code" element={<AddCode />} />
        <Route path="/admin/code-manager" element={<CodeManager />} />
        <Route path="/admin/reservations" element={<AdminReservationList />} />
        <Route path="/admin/delete-code" element={<DeleteCode />} />

        {/* 없는 경로 → 홈으로 리디렉션 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}