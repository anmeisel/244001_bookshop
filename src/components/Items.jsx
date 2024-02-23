import "./Cart.css"

export default function Items(props) {
    return (
        <div className="book-box">
            <div key={props.index} className="book-info">
                <div className="book-info"><span>Title:</span> {props.book.title}</div>
                <div className="book-info"><span>Author:</span> {props.book.author}</div>
                <div className="book-info img"><img src={props.book.image}/></div>
                <div className="book-info"><span>Publication date:</span> {props.book.releaseDate}</div>
                <div className="book-info"><span>Summary:</span><div className="summary"> {props.book.shortBio}</div></div>
                <div className="book-info"><span>Price:</span> £{props.book.price}</div>
                {props.book.discount && ( <div className="book-info"><span>Discount:</span> {props.book.discount}%</div> )}
            </div>
            <button className="cart-button" onClick={() => props.handleAddToCart(props.index)}>
                Add to Cart
            </button>
        </div>
    )
}