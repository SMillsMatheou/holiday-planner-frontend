import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts";

export default function GuestLayout() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
