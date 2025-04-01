import { useState } from 'react';
import '../App.css'
import BookList from '../components/BookList'
import CategoryFilter from '../components/CategoryFilter'
import WelcomeBand from '../components/WelcomBand'
import CartSummary from '../components/CartSummary';


function BooksPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
    <div className='container mt-4'>  
      <CartSummary />
      <WelcomeBand />
      <div className='row'>
        <div className='col-lg-3 col-md-4 col-sm-12'>
          <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
        </div>
        <div className='col-lg-9 col-md-8 col-sm-12'>
          <BookList selectedCategories={selectedCategories}/>
        </div>
      </div>
    </div>
    </>
  )
}

export default BooksPage
