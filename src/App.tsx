import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Users from "./pages/Users";

import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Conferences from "./pages/Conferences";
import Speakers from "./pages/Speakers";
import Sponsors from "./pages/Sponsors";
import CRM from "./pages/CRM";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";

import {
  AuthProvider,
} from "./auth/AuthContext";

import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<RegisterPage />}
          />

          <Route
            path="*"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Routes>

                    <Route
                      path="/"
                      element={<Dashboard />}
                    />

                    <Route
                      path="/dashboard"
                      element={<Dashboard />}
                    />

                    <Route
                      path="/search"
                      element={<Search />}
                    />

                    <Route
                      path="/conferences"
                      element={<Conferences />}
                    />

                    <Route
                      path="/speakers"
                      element={<Speakers />}
                    />

                    <Route
                      path="/sponsors"
                      element={<Sponsors />}
                    />

                    <Route
                      path="/crm"
                      element={<CRM />}
                    />

<Route
  path="/users"
  element={<Users />}
/>

                    <Route
                      path="/analytics"
                      element={<Analytics />}
                    />

                    <Route
                      path="/notifications"
                      element={<Notifications />}
                    />

                    <Route
                      path="/settings"
                      element={<Settings />}
                    />

                  </Routes>
                </MainLayout>
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;