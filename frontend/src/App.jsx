import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/login";
import Semester from "./pages/semester";
import Subject from "./pages/subject";
import ResourcePage from "./pages/resource";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/semester" element={<Semester />} />
      <Route path="/subject/:semId" element={<Subject />} />
      <Route path="/resource/:subId" element={<ResourcePage />} />
    </Routes>
  );
}
