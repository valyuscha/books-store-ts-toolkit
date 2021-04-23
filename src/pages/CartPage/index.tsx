import React, {FC} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {HeaderLayout} from 'layouts'
import {purchase, showConfirmClearCartModal} from 'store'
import {State} from 'globalInterfaces'
import {CartItem, ConfirmClearCartModal, PurchaseModal} from 'components'
import {Button, Loader} from 'components/UI'

import {
  CartImg,
  CartItemsWrapper,
  CartPageContent,
  EmptyCartBlockWrapper,
  EmptyCartMessage,
  EmptyTrashButtonWrapper,
  EmptyTrashTotalCountPriceWrapper,
  PurchaseButtonWrapper,
  TotalCountPrice,
  TotalCountPriceWrapper
} from './style'

const CartPage: FC = () => {
  const dispatch = useDispatch()
  const {addedBooks, totalCount, totalPrice} = useSelector((state: State) => state.cart)
  const {isLoading} = useSelector((state: State) => state.loader)

  const addedBooksToCartArr = Object.entries(addedBooks).map(book => {
    const bookInfo = {...book[1]}
    bookInfo.id = book[0]
    return bookInfo
  })

  return (
    <HeaderLayout>
      {!isLoading ? (
        <CartPageContent>
          {addedBooksToCartArr.length ? (
            <>
              <PurchaseButtonWrapper>
                <Button
                  btnType="purple"
                  onClick={() => dispatch(purchase(addedBooksToCartArr))}>
                  Purchase
                </Button>
              </PurchaseButtonWrapper>
              <CartItemsWrapper>
                {addedBooksToCartArr.map(book => {
                  return (
                    <CartItem
                      key={book.id}
                      allBooks={addedBooksToCartArr}
                      book={book} />
                  )
                })}
              </CartItemsWrapper>
              <EmptyTrashTotalCountPriceWrapper>
                <EmptyTrashButtonWrapper>
                  <Button
                    btnType="purple"
                    onClick={() => dispatch(showConfirmClearCartModal())}>
                    Empty Trash
                  </Button>
                </EmptyTrashButtonWrapper>
                <TotalCountPriceWrapper>
                  <TotalCountPrice>Total count: {totalCount}</TotalCountPrice>
                  <TotalCountPrice>Total price: {totalPrice}$</TotalCountPrice>
                </TotalCountPriceWrapper>
              </EmptyTrashTotalCountPriceWrapper>
              <ConfirmClearCartModal />
            </>
          ) : (
            <EmptyCartBlockWrapper>
              <CartImg fill="#464646" />
              <EmptyCartMessage>Cart empty...</EmptyCartMessage>
            </EmptyCartBlockWrapper>
          )}
        </CartPageContent>
      ) : <Loader />}
      <PurchaseModal />
    </HeaderLayout>
  )
}

export default CartPage