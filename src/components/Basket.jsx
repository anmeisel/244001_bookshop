import "./Cart.css"

export default function Basket(props) {
    return (
        <div className="cart-info" key={props.index}>
            <div className="book-info"><span>Title:</span> {props.books[props.index].title}</div>
            <div className="book-info"><span>Price:</span> £{props.books[props.index].price} GBP</div>
            {props.books[props.index].discount && ( <div className="book-info"><span>Discount:</span> {props.books[props.index].discount}%</div> )}
            <div className="quantity-container"><div>Quantity: <div className="quantity">{props.cartItem.quantity}</div></div><button className="cart-button-remove" onClick={() => props.handleRemoveFromCart(props.index)}>Remove</button></div>
        </div>
    )
}