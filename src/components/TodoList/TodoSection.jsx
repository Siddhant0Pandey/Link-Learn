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
      <Link to="/" className="goback_btn">
        Go to home page
      </Link>
      <div className="todolist_section">
        <TodoList />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default TodoSection;
