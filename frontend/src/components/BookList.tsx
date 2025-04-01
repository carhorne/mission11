import { useEffect, useState } from "react";
import {Book} from '../types/Book';
import { useNavigate } from "react-router-dom";

function BookList({selectedCategories} : {selectedCategories: string[]}) {

const [books, setBooks] = useState<Book[]>([]);
const [pageSize, setPageSize] = useState<number>(5);
const [pageNum, setPageNum] = useState<number>(1);
const [totalItems, setTotalItems] = useState<number>(0);
const [totalPages, setTotalPages] = useState<number>(0);
const [sortOrder, setSortOrder] = useState<string>("asc");
const navigate = useNavigate();

useEffect(() => {
    setPageNum(1); // Reset pageNum when selectedCategories change
}, [selectedCategories]);

useEffect(() => {
    const fetchBooks = async () => {
        const categoryParams = selectedCategories.map((cat) => `types=${encodeURIComponent(cat)}`)
        .join('&');

      const response = await fetch(`https://localhost:5000/Book/paged?pageSize=${pageSize}&pageNum=${pageNum}&sortOrder=${sortOrder}${selectedCategories.length ? `&${categoryParams}` : ''}`);
      const data = await response.json();
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
}, [pageSize, pageNum, sortOrder, selectedCategories]);

    return (
        <>
            <button onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                setPageNum(1); // Reset to the first page when sorting changes
                }}>
                Sort by Title ({sortOrder === "asc" ? "Ascending" : "Descending"})
            </button>
            <br /><br />
            {books.map((b) =>
                <div id="bookCard" className="card" key={b.bookID}>
                    <h3 className="card-title">{b.title}</h3>
                    <div className="card-body">
                    <ul className="list-unstyled">
                        <li><strong>Author: </strong>{b.author}</li>
                        <li><strong>Publisher: </strong>{b.publisher}</li>
                        <li><strong>ISBN: </strong>{b.isbn}</li>
                        <li><strong>Classification: </strong>{b.classification}</li>
                        <li><strong>Category: </strong>{b.category}</li>
                        <li><strong>Page Count: </strong>{b.pageCount}</li>
                        <li><strong>Price: </strong>${b.price}</li>
                    </ul>

                    <button className="btn btn-success" onClick={() => navigate(`/buy/${b.title}/${b.price}/${b.bookID}`)}>Buy</button>
                    </div>                   
                </div>
        
        )}

        <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>

        {
            [...Array(totalPages)].map((_, index) => (
                <button key={index + 1} onClick={() => setPageNum(index + 1)} disabled={pageNum === (index + 1)}>
                    {index + 1}
                </button>
            ))
        }

        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

        <br />
        <label>
            Results per page:
            <select value={pageSize} 
            onChange={(p) => {
                setPageSize(Number(p.target.value));
                setPageNum(1)
                }}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </label>

        </>

    );
}

export default BookList;