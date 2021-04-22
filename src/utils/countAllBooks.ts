import {IBook} from 'globalInterfaces'

export const countAllBooks = (books: IBook[]) => {
  return books.reduce((amount, book) => amount + book.addedCount, 0)
}