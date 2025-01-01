import "./todosection.css";
import "../../styles/globals.css";
// import Footer from "../Footer";
import Header from "../Header/Header";
import TodoList from "./TodoList";
import { Link } from "react-router-dom";

function TodoSection() {
  return (
    <div className="todolist_container">
      <Header />

      <div className="todolist_section">
        <TodoList />
      </div>
      <Link to="/" className="goback_btn">
        Go to home page
      </Link>
      {/* <Footer /> */}
    </div>
  );
}

export default TodoSection;
