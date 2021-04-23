import React, {FC} from 'react'
import {useDispatch} from 'react-redux'
import {plusIcon, minusIcon, trashIcon} from 'assets'
import {editBooksCount, removeBookFromCart} from 'store'
import {ICartBook} from 'globalInterfaces'

import {
  CartItemWrapper,
  CartItemTitle,
  CounterTotalPriceDeleteBookWrapper,
  BooksCounterWrapper,
  IncreaseDecreaseButton,
  IncreaseDecreaseIcon,
  BooksCount,
  TotalPrice,
  TrashButton,
  TrashIcon
} from './style'

interface CartItemProps {
  book: ICartBook
  allBooks: ICartBook[]
}

const CartItem: FC<CartItemProps> = ({book, allBooks}) => {
  const dispatch = useDispatch()

  return (
    <CartItemWrapper allBooks={allBooks}>
      <CartItemTitle to={`catalog/${book.id}`}>{book.title}</CartItemTitle>
      <CounterTotalPriceDeleteBookWrapper>
        <BooksCounterWrapper>
          <IncreaseDecreaseButton
            canIncreaseBooksCount={book.canUserIncreaseBooksCount}
            onClick={() => dispatch(editBooksCount(book.id, 'add'))}>
            <IncreaseDecreaseIcon src={plusIcon} />
          </IncreaseDecreaseButton>
          <BooksCount>{book.addedCount}</BooksCount>
          <IncreaseDecreaseButton
            canDecreaseBooksCount={book.canUserDecreaseBooksCount}
            onClick={() => dispatch(editBooksCount(book.id, 'remove'))}>
            <IncreaseDecreaseIcon src={minusIcon} />
          </IncreaseDecreaseButton>
        </BooksCounterWrapper>
        <TotalPrice>{book.currentBookTotalPrice}$</TotalPrice>
        <TrashButton onClick={() => dispatch(removeBookFromCart(book.id))}>
          <TrashIcon src={trashIcon} />
        </TrashButton>
      </CounterTotalPriceDeleteBookWrapper>
    </CartItemWrapper>
  )
}

export default CartItem