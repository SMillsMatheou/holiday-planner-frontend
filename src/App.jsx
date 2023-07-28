import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GuestLayout, ProtectedLayout } from "./components";
import {
  Login,
  Register,
  Profile,
  ActivityCreate,
  ActivityView,
  ActivityList,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestLayout />}>
          <Route path="" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/" element={<ProtectedLayout />}>
          <Route path="profile" element={<Profile />} />
          {/* <Route path="test" element={<Test />} /> */}

          <Route path="activities/create" element={<ActivityCreate />} />
          <Route path="activities/:id" element={<ActivityView />} />
          <Route path="activities" element={<ActivityList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
