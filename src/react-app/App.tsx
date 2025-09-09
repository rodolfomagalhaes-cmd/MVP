import { BrowserRouter as Router, Routes, Route } from "react-router";
import { DemoAuthProvider } from "@/react-app/components/DemoAuthProvider";
import HomePage from "@/react-app/pages/Home";
import Login from "@/react-app/pages/Login";
import AuthCallback from "@/react-app/pages/AuthCallback";
import SetupProfile from "@/react-app/pages/SetupProfile";
import AddItem from "@/react-app/pages/AddItem";
import MyItems from "@/react-app/pages/MyItems";
import ItemDetail from "@/react-app/pages/ItemDetail";
import AppDashboard from "@/react-app/pages/AppDashboard";
import DemoInfo from "@/react-app/pages/DemoInfo";

export default function App() {
  return (
    <DemoAuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/setup-profile" element={<SetupProfile />} />
          <Route path="/add-item" element={<AddItem />} />
          <Route path="/my-items" element={<MyItems />} />
          <Route path="/items/:id" element={<ItemDetail />} />
          <Route path="/dashboard" element={<AppDashboard />} />
          <Route path="/demo" element={<DemoInfo />} />
        </Routes>
      </Router>
    </DemoAuthProvider>
  );
}
