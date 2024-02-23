import './App.css';
import { useState } from 'react';
import BookArray from './model/BookArray'
import Items from './components/Items'
import Basket from './components/Basket'

function App() {
  const [books, setBooks] = useState(BookArray)
  // const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (index) => {
    // setSelectedIndexes([...selectedIndexes, index]);
    const item = books[index];
    const itemIndex = cartItems.findIndex((cartItem) => cartItem.book.id === item.id);
    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { book: item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (index) => {
    // const updatedIndexes = selectedIndexes.filter((idx) => idx !== index);
    // setSelectedIndexes(updatedIndexes);
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity -= 1;
    if (updatedCartItems[index].quantity === 0) {
      updatedCartItems.splice(index, 1);
    }
    setCartItems(updatedCartItems);
  };

  const calculateTotal = () => {
    let totalPrice = 0;
    // selectedIndexes.forEach((index) => {
    //   totalPrice += (books[index].price * ((100 - books[index].discount) / 100))
    // });
    cartItems.forEach((cartItem) => {
      totalPrice += (cartItem.book.price * ((100 - cartItem.book.discount) / 100)) * cartItem.quantity;
    });
    return Math.round((totalPrice + Number.EPSILON) * 100) / 100
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="items-container">
        <div className="header">Books</div>
          <div className="book-box-container">
            {books.map((book, index) => {
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
      </header>
    </div>
  );
}

export default App;
