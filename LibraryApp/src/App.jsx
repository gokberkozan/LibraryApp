import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Navbar from './Components/Navbar';
import Author from './Pages/Author/Author';
import Book from './Pages/Book/Book';
import BookBorrowing from './Pages/BookBorrowing/BookBorrowing';
import Category from './Pages/Category/Category';
import Publisher from './Pages/Publisher/Publisher';
import Home from './Pages/Home/Home';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/author" element={<Author />} />
        <Route path="/book" element={<Book />} />
        <Route path="/bookborrowing" element={<BookBorrowing />} />
        <Route path="/category" element={<Category />} />
        <Route path="/publisher" element={<Publisher />} />
      </Routes>
    </>
  );
}

export default App;
