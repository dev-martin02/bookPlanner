import { Route, Routes } from "react-router-dom";
import Book from "./pages/Book";
import Home from "./pages/Home";
import OneBook from "./components/OneBook";
import SignUp from "./components/user/SignUp";
import Login from "./components/user/Login";
import { Chapter } from "./components/book/Chapter";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="book" element={<Book />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="book/:id" element={<OneBook />} />
        <Route path="book/:id/:chapterId" element={<Chapter />} />
      </Routes>
    </>
  );
}

export default App;
