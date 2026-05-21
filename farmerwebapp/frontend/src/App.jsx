import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { useAuth } from "./context/AuthContext";
import { AuthPage } from "./pages/AuthPage";
import { CartPage } from "./pages/CartPage";
import { FarmerDashboard } from "./pages/FarmerDashboard";
import { MarketPage } from "./pages/MarketPage";
import { OrdersPage } from "./pages/OrdersPage";

function RequireRole({ role, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MarketPage />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/register" element={<AuthPage mode="register" />} />
        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/farmer"
          element={
            <RequireRole role="farmer">
              <FarmerDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/orders"
          element={
            <RequireRole role="consumer">
              <OrdersPage />
            </RequireRole>
          }
        />
      </Routes>
    </>
  );
}
