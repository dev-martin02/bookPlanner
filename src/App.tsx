import { Route, Routes } from "react-router-dom";
import Book from "./pages/Book";
import Home from "./pages/Home";
import OneBook from "./components/OneBook";
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
        <Route path="onebook" element={<OneBook />} />
      </Routes>
    </>
  );
}

export default App;
