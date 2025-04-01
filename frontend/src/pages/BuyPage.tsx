import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function BuyPage() {
    const navigate = useNavigate();
    const {title, price, bookID} = useParams();
    const {addToCart} = useCart();

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookID: Number(bookID),
            quantity: Number(1),
            title: title || 'No Book Found',
            price: Number(price)};
            addToCart(newItem);
            navigate('/cart');
    }

    return (
        <>
            <WelcomeBand />
            <h2>Add "{title}" to cart?</h2>

            <div>
                <h5>Price: ${price}</h5>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>

            <button onClick={() => navigate('/')}>No</button>
        </>
    )
}

export default BuyPage;