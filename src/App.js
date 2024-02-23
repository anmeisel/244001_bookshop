import './App.css';
import { useState } from 'react';
import BookArray from './model/BookArray'
import Items from './components/Items'
import Basket from './components/Basket'

function App() {
  const [books, setBooks] = useState(BookArray)
  // const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [cartItems, setCartItems] = useState([])
  const [toggle, setToggle] = useState(false)
  const [selectedGenre, setSelectedGenre] = useState("Everything")

  const handleAddToCart = (index) => {
    // setSelectedIndexes([...selectedIndexes, index]);
    const item = books[index]
    const itemIndex = cartItems.findIndex((cartItem) => cartItem.book.id === item.id);
    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems]
      updatedCartItems[itemIndex].quantity += 1
      setCartItems(updatedCartItems)
    } else {
      setCartItems([...cartItems, { book: item, quantity: 1 }])
    }
  }

  const handleRemoveFromCart = (index) => {
    // const updatedIndexes = selectedIndexes.filter((idx) => idx !== index);
    // setSelectedIndexes(updatedIndexes);
    const updatedCartItems = [...cartItems]
    updatedCartItems[index].quantity -= 1
    if (updatedCartItems[index].quantity === 0) {
      updatedCartItems.splice(index, 1)
    }
    setCartItems(updatedCartItems)
  }

  const calculateTotal = () => {
    let totalPrice = 0;
    // selectedIndexes.forEach((index) => {
    //   totalPrice += (books[index].price * ((100 - books[index].discount) / 100))
    // });
    cartItems.forEach((cartItem) => {
      totalPrice += (cartItem.book.price * ((100 - cartItem.book.discount) / 100)) * cartItem.quantity
    });
    return Math.round((totalPrice + Number.EPSILON) * 100) / 100
  }
  
  const cartButton = () => {
    let totalItems = 0
    cartItems.forEach((cartItem) => {
      totalItems += cartItem.quantity
    });
    return totalItems
  }

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value)
  }

  const filteredBooks = selectedGenre === "Everything" ? books : books.filter(book => book.genre.includes(selectedGenre));

  const uniqueGenres = [...new Set(books.flatMap(book => book.genre))];

  return (
    <div className="App">
      <header className="App-header">
        <div className="items-container">
        <button className="basket-button" onClick={() => setToggle(!toggle)}>
          Your cart: {cartButton(cartItems)}
        </button>
        <button className="search-bar">
          <label htmlFor="genre">Genre:</label>
          <select name="genre" id="genre" onChange={handleGenreChange} value={selectedGenre}>
          <option value="Everything">Everything</option>
            {uniqueGenres.map((genreItem, index) => (
              <option key={index} value={genreItem}>{genreItem}</option>
            ))}
          </select>
        </button>
        <div className="header">Books</div>
          <div className="book-box-container">
            {filteredBooks.map((book, index) => {
              // const isSelected = selectedIndexes.includes(index);
              return (
                <Items
                  key={index}
                  index={index}
                  book={book}
                  // isSelected={isSelected}
                  handleAddToCart={handleAddToCart}
                />
              );
            })}
          </div>
        </div>
        {toggle && (
        <div className="cart">
          <div className="header">Cart</div>
            <div className="chosen-item">
              {cartItems.map((cartItem, index) => {
                return (
                  <Basket calculateTotal={calculateTotal} handleRemoveFromCart={handleRemoveFromCart} books={books} index={index} cartItem={cartItem}/>
                )
              })}
            </div>
            <div className="total"><span>Total price:</span><b> £{calculateTotal()}</b> GBP
          </div>
        </div>
        )}
      </header>
    </div>
  );
}

export default App;
