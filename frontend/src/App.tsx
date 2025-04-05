

import './App.css'
import BooksPage from './pages/BooksPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BuyPage from './pages/BuyPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';
import "bootstrap/dist/css/bootstrap.min.css";
import AdminBooksPage from './pages/AdminBooksPage';


function App() {
  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route path='/' element={<BooksPage />} />
          <Route path='/buy/:title/:price/:bookID' element={<BuyPage />} />
          <Route path='/cart' element={<CartPage />}/>
          <Route path='/adminbooks' element={<AdminBooksPage />} />
        </Routes>
      </Router>
    </CartProvider>
    </>
  )
}

export default App
