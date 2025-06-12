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
import RequireAdmin from './components/RequireAdmin'; // ✅ 추가

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 사용자 페이지 */}
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/check" element={<CheckReservation />} />

        {/* 관리자 로그인 */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 관리자 보호 라우팅 */}
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <Dashboard />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/add-movie"
          element={
            <RequireAdmin>
              <AddMovie />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/add-screening"
          element={
            <RequireAdmin>
              <AddScreening />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/add-code"
          element={
            <RequireAdmin>
              <AddCode />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/code-manager"
          element={
            <RequireAdmin>
              <CodeManager />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/reservations"
          element={
            <RequireAdmin>
              <AdminReservationList />
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/delete-code"
          element={
            <RequireAdmin>
              <DeleteCode />
            </RequireAdmin>
          }
        />

        {/* 없는 경로 → 홈으로 리디렉션 */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}