import { useAuth } from "../../contexts";

export default function Profile() {
  const { user } = useAuth();
  return (
    <>
      Name: {user.name}
      Email: {user.email}
      Created At: {user.created_at}
    </>
  );
}
