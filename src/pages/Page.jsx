/* eslint-disable react/prop-types */
import "../styles/page.css";
import Hero from "./Hero";
import NoteTab from "./NoteTab";

function Page({ openNote, setOpenNote }) {
  return (
    <div className="page_section">
      {openNote ? (
        <NoteTab openNote={openNote} setOpenNote={setOpenNote} />
      ) : (
        <Hero />
      )}
    </div>
  );
}

export default Page;
