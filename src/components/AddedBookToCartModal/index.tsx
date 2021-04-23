import React, {FC, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {hideAddedBookToCartModal} from 'store'
import {State} from 'globalInterfaces'
import {Modal, Button} from 'components/UI'

import {Message} from './style'

const AddedBookToCartModal: FC = () => {
  const dispatch = useDispatch()
  const {isAddedBookToCartModalVisible} = useSelector((state: State) => state.modals)

  useEffect(() => {
    if (isAddedBookToCartModalVisible) {
      const hideModalTimeout = setTimeout(() => {
        dispatch(hideAddedBookToCartModal())
      }, 5000)

      return () => clearTimeout(hideModalTimeout)
    }
  }, [isAddedBookToCartModalVisible])

  return (
    <Modal show={isAddedBookToCartModalVisible}>
      <Message>Book was successfully added to cart</Message>
      <Button onClick={() => dispatch(hideAddedBookToCartModal())}>
        Close
      </Button>
    </Modal>
  )
}

export default AddedBookToCartModal