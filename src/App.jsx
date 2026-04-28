import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { IssueProvider } from "./context/IssueContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <IssueProvider>
          <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/user/*"
              element={
                <ProtectedRoute role="user">
                  <UserLayout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/*"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" />} />

          </Routes>
        </IssueProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
