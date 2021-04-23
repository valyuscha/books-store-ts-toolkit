import {ICartBook} from './globalInterfaces'

export type AddRemoveBookFromCartAction = 'add' | 'remove'

export type BooksFilter =
  'No filters' |
  '0 < price < 25' |
  '25 < price < 50' |
  'price > 50'

export type BookInfo = {
  [key: string]: ICartBook
}