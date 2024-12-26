import { useContext, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import Page from "./pages/Page";
import "./styles/globals.css";

function App() {
  const { theme, font } = useContext(ThemeContext);
  const [openNote, setOpenNote] = useState(false);

  return (
    <div className={`${theme} ${font} fix_width`}>
      <div className={`container`}>
        <Header openNote={openNote} setOpenNote={setOpenNote} />
        <Page openNote={openNote} setOpenNote={setOpenNote} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
