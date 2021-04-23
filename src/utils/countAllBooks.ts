import {ICartBook} from 'globalInterfaces'

export const countAllBooks = (books: ICartBook[]) => {
  return books.reduce((amount, book) => amount + book.addedCount, 0)
}