import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mt-4">
            <h2 className="mb-3">🛒 Your Cart</h2>

            {cart.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Title</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item: CartItem) => (
                                <tr key={item.bookID}>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    <td>${item.price.toFixed(2)}</td>
                                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                                    <td>
                                        <button 
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeFromCart(item.bookID)}
                                        >
                                            ❌ Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Sticky Checkout Bar */}
            {cart.length > 0 && (
                <div className="fixed-bottom bg-light p-3 border-top shadow">
                    <div className="container d-flex justify-content-between align-items-center">
                        <h4>Total: <strong>${totalAmount.toFixed(2)}</strong></h4>
                        <div>
                            <button className="btn btn-success me-2">🛍️ Checkout</button>
                            <button className="btn btn-outline-primary" onClick={() => navigate('/')}>
                                🔙 Continue Shopping
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartPage;
