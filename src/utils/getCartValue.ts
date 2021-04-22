import Cart from 'models/Cart'
import {IBook} from 'globalInterfaces'

interface AddedBooks {
  addedBooks: {
    [key: number]: IBook
  }
  totalPrice: number
  totalCount: number
}

// export const getCartValue = () => {
//   const addedToCartBooks = localStorage.getItem('addedToCartBooks')
//   const parsedBooks: AddedBooks = addedToCartBooks ? JSON.parse(addedToCartBooks) : null
//
//   if (!parsedBooks) {
//     return new Cart({}, 0, 0)
//   }
//
//   return new Cart(
//     parsedBooks.addedBooks,
//     parsedBooks.totalPrice,
//     parsedBooks.totalCount
//   )
// }