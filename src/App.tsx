import { Route, Routes } from "react-router-dom";
import Book from "./pages/Book";
import Home from "./pages/Home";
import OneBook from "./components/OneBook";
import SignUp from "./components/user/SignUp";
import Login from "./components/user/Login";
/*
   Book Planner
    - Get the name of the book 
    - Write notes of the books
      - CRUD operations
    - User can have multiples Books
*/
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="book" element={<Book />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="book/:id" element={<OneBook />} />
      </Routes>
    </>
  );
}

export default App;
