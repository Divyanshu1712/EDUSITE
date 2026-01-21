import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner"
import ProtectedRoute from "./components/common/ProtectedRoute";
import { ThemeProvider } from "./components/common/theme-provider"
import { AuthProvider } from "./providers/auth-provider";
import Login from "./pages/Login";
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AdminUsers from "./pages/user";
import DashboardLayout from "./components/layout/DashboardLayout"


export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes with DashboardLayout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* All these routes render inside DashboardLayout's <Outlet /> */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route index element={<Dashboard />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  )
}

