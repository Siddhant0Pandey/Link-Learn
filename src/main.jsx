import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserProfileForm from "./components/UserAuth/UserProfileForm.jsx"; // The toggle component
import App from "./App.jsx";
import TodoSection from "./components/TodoList/TodoSection.jsx";

const token = localStorage.getItem("token");
createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<UserProfileForm />} />
        <Route path="/register" element={<UserProfileForm />} />
        <Route path="/" element={token ? <App /> : <Navigate to="/login" />} />
        <Route path="/tasks" element={<TodoSection />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
