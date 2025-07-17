import { useSelector } from "react-redux";
import AdminDashboard from "./AdminDashboard";
import StaffDashboard from "./StaffDashboard";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      {user.role === "admin" && <AdminDashboard />}
      {user.role === "staff" && <StaffDashboard />}
    </div>
  );
};

export default Dashboard;
