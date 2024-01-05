import { useAuth } from "../context/AuthContext";

function TaksPage() {
  const { user } = useAuth();
  console.log(user)
  return <div>TaksPage</div>;
}

export default TaksPage;
