import React, {FC, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {addNewBookToCart, showAddedBookToCartModal} from 'store'
import {Button} from 'components/UI'
import {minusIcon, plusIcon} from 'assets'
import {countTotalPriceOfSameBooks} from 'utils'
import {AddRemoveBookFromCartAction} from 'globalTypes'
import {ICartBook, State} from 'globalInterfaces'
import {getChangedBooksCount} from './getChangedBooksCount'
import {disableAddingNewBooksIfThereISNoCurrentBooks} from './disableAddingNewBooks'

import {
  AddToCartButtonWrapper,
  BookPriceCountInfoWrapper,
  Count,
  CountValue,
  IncreaseDecreaseButton,
  IncreaseDecreaseIcon,
  InfoLabel,
  InfoPartWrapper,
  InfoValue
} from './style'

const BookPriceCountInfo: FC = () => {
  const dispatch = useDispatch()
  const {currentBookInfo} = useSelector((state: State) => state.books)
  const {addedBooks} = useSelector((state: State) => state.cart)
  const [totalPrice, setTotalPrice] = useState<number>(currentBookInfo.price)
  const [booksCount, setBooksCount] = useState<number>(1)
  const [canIncreaseBooksCount, setCanIncreaseBooksCount] = useState<boolean>(true)
  const [canDecreaseBooksCount, setCanDecreaseBooksCount] = useState<boolean>(false)

  useEffect(() => {
    disableAddingNewBooksIfThereISNoCurrentBooks(
      addedBooks,
      currentBookInfo,
      setBooksCount,
      setCanIncreaseBooksCount,
      setTotalPrice
    )
  })

  const changeBooksAmountHandler = (action: AddRemoveBookFromCartAction): void => {
    const currentBookInCart: [string, ICartBook][] = Object.entries<ICartBook>(addedBooks)
      .filter((book) => {
        if (book[0] === currentBookInfo.id) {
          return book
        }
      })

    const changedBooksCount = getChangedBooksCount(
      currentBookInCart,
      booksCount,
      currentBookInfo,
      setCanIncreaseBooksCount,
      action
    )

    if (changedBooksCount) {
      const changedTotalPrice = countTotalPriceOfSameBooks(
        currentBookInfo.price,
        changedBooksCount
      )

      setTotalPrice(changedTotalPrice)
    }

    if (changedBooksCount > 1) {
      setCanDecreaseBooksCount(true)
    } else if (changedBooksCount === 1) {
      setCanDecreaseBooksCount(false)
    }

    setBooksCount(changedBooksCount)
  }

  const addNewBookToCartHandler = () => {
    if (booksCount) {
      dispatch(showAddedBookToCartModal())
      dispatch(addNewBookToCart(currentBookInfo, booksCount, totalPrice))
      setBooksCount(1)
      setCanDecreaseBooksCount(false)

      disableAddingNewBooksIfThereISNoCurrentBooks(
        addedBooks,
        currentBookInfo,
        setBooksCount,
        setCanIncreaseBooksCount,
        setTotalPrice
      )

      setCanDecreaseBooksCount(false)
    }
  }

  return (
    <BookPriceCountInfoWrapper>
      <InfoPartWrapper>
        <InfoLabel>Price, $ </InfoLabel>
        <InfoValue>{currentBookInfo.price}</InfoValue>
      </InfoPartWrapper>
      <InfoPartWrapper>
        <InfoLabel>Count</InfoLabel>
        <CountValue>
          <IncreaseDecreaseButton
            canIncreaseBooksAmount={canIncreaseBooksCount}
            onClick={() => changeBooksAmountHandler('add')}>
            <IncreaseDecreaseIcon src={plusIcon} />
          </IncreaseDecreaseButton>
          <Count>{booksCount}</Count>
          <IncreaseDecreaseButton
            canDecreaseBooksAmount={canDecreaseBooksCount}
            onClick={() => changeBooksAmountHandler('remove')}>
            <IncreaseDecreaseIcon src={minusIcon} />
          </IncreaseDecreaseButton>
        </CountValue>
      </InfoPartWrapper>
      <InfoPartWrapper>
        <InfoLabel>Total price, $</InfoLabel>
        <InfoValue>{totalPrice}</InfoValue>
      </InfoPartWrapper>
      <AddToCartButtonWrapper>
        <Button onClick={addNewBookToCartHandler}>Add to Cart</Button>
      </AddToCartButtonWrapper>
    </BookPriceCountInfoWrapper>
  )
}

export default BookPriceCountInfo