import React, {FC} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {hidePurchaseModal, clearCart, clearPurchaseMessage} from 'store'
import {State} from 'globalInterfaces'
import {BoughtCartItem} from 'components'
import {Modal, Button} from 'components/UI'

import {Message, PurchaseList, TotalPrice} from './style'

const PurchaseModal: FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {addedBooks, totalPrice, purchaseMessage} = useSelector((state: State) => state.cart)
  const {isPurchaseModalVisible} = useSelector((state: State) => state.modals)

  const addedBooksToCartArr = Object.entries(addedBooks).map(book => {
    const bookInfo = {...book[1]}
    bookInfo.id = book[0]
    return bookInfo
  })

  const finishPurchaseHandler = () => {
    dispatch(hidePurchaseModal())
    history.push('/catalog')
    dispatch(clearCart())
    dispatch(clearPurchaseMessage())
  }

  if (purchaseMessage) {
    return (
      <Modal show={isPurchaseModalVisible}>
        <Message>{purchaseMessage}</Message>
        <PurchaseList>
          <BoughtCartItem firstRow />
          {addedBooksToCartArr.map(book => {
            return (
              <BoughtCartItem
                key={book.id}
                book={book} />
            )
          })}
        </PurchaseList>
        <TotalPrice>Total price: {totalPrice}$</TotalPrice>
        <Button onClick={finishPurchaseHandler}>
          Close
        </Button>
      </Modal>
    )
  } else {
    return <div />
  }
}

export default PurchaseModal