import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfileForm from "./components/UserAuth/UserProfileForm.jsx"; // The toggle component
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<UserProfileForm />} />
          <Route path="/register" element={<UserProfileForm />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
