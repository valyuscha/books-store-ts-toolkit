import {ICartBook, IDefaultBook} from 'globalInterfaces'
import {AddRemoveBookFromCartAction, BookInfo} from 'globalTypes'

import {
  chooseBooksAmount,
  countTotalPriceOfSameBooks,
  countTotalPriceOfAllBooks,
  countAllBooks
} from 'utils'

class Cart {
  private static _instance: Cart

  constructor(
    public addedBooks: BookInfo,
    public totalPrice: number,
    public totalCount: number
  ) {
    if (Cart._instance) {
      return Cart._instance
    }
    Cart._instance = this
  }

  addBookToCart = (
    book: IDefaultBook,
    addedCount: number,
    currentBookTotalPrice: number
  ) => {
    const booksIds = Object.keys(this.addedBooks)

    const newBook: ICartBook = {
      id: book.id,
      title: book.title,
      price: book.price,
      availableCount: book.count,
      canUserIncreaseBooksCount: addedCount !== book.count,
      canUserDecreaseBooksCount: addedCount !== 1,
      addedCount,
      currentBookTotalPrice
    }

    if (booksIds) {
      if (!this.addedBooks[book.id]) {
        const addedBooks = {...this.addedBooks}
        addedBooks[book.id] = {...newBook}
        this.addedBooks = addedBooks
      } else {
        const addedBook = {...this.addedBooks[book.id]}
        addedBook.addedCount += addedCount
        addedBook.currentBookTotalPrice = countTotalPriceOfSameBooks(
          addedBook.price,
          addedBook.addedCount
        )

        addedBook.canUserIncreaseBooksCount = addedBook.addedCount !== addedBook.availableCount
        addedBook.canUserDecreaseBooksCount = addedBook.addedCount !== 1

        const filteredBooksEntries = Object
          .entries(this.addedBooks).filter(book => {
            return book[0] !== addedBook.id
          })

        const filteredBooks = Object.fromEntries(filteredBooksEntries)
        const newBook = {[addedBook.id]: addedBook}

        this.addedBooks = {...filteredBooks, ...newBook}
      }
    } else {
      const addedBooks = {...this.addedBooks}
      addedBooks[book.id] = {...newBook}
      this.addedBooks = addedBooks    
    }

    const books = Object.values(this.addedBooks)
    this.totalPrice = countTotalPriceOfAllBooks(books)
    this.totalCount = countAllBooks(books)

    return Cart._instance
  }

  removeBookFromCart = (bookId: string) => {
    const booksEntries = Object.entries(this.addedBooks)
    const filteredBooks = booksEntries.filter(book => +book[0] !== +bookId)
    this.addedBooks = Object.fromEntries(filteredBooks)

    const booksValues = Object.values(this.addedBooks)
    this.totalPrice = countTotalPriceOfAllBooks(booksValues)
    this.totalCount = countAllBooks(booksValues)

    return Cart._instance
  }

  editCountOfOneBookDuplicates = (bookId: string, action: AddRemoveBookFromCartAction) => {
    const bookInfo = {...this.addedBooks[bookId]}

    const changedBooksDuplicatesAmount = chooseBooksAmount(
      bookInfo.addedCount,
      bookInfo.availableCount,
      action
    )

    const {availableCount} = bookInfo

    const canUserIncreaseBooksCount = changedBooksDuplicatesAmount !== availableCount

    const canUserDecreaseBooksCount = changedBooksDuplicatesAmount !== 1

    bookInfo.canUserIncreaseBooksCount = canUserIncreaseBooksCount
    bookInfo.canUserDecreaseBooksCount = canUserDecreaseBooksCount

    bookInfo.addedCount = changedBooksDuplicatesAmount
    bookInfo.currentBookTotalPrice = countTotalPriceOfSameBooks(
      bookInfo.price,
      changedBooksDuplicatesAmount
    )

    const filteredBooksEntries = Object
      .entries(this.addedBooks).filter(book => {
        return book[0] !== bookInfo.id
      })

    const filteredBooks = Object.fromEntries(filteredBooksEntries)
    const newBook = {[bookInfo.id]: bookInfo}

    this.addedBooks = {...filteredBooks, ...newBook}

    const books = Object.values(this.addedBooks)
    this.totalPrice = countTotalPriceOfAllBooks(books)
    this.totalCount = countAllBooks(books)

    return Cart._instance
  }

  clearCart = () => {
    this.addedBooks = {}
    this.totalPrice = 0
    this.totalCount = 0

    return Cart._instance
  }
}

export default Cart