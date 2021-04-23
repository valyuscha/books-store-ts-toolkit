import React, {FC} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Modal, Button} from 'components/UI'
import {hideConfirmLogoutModal, logout, hideResponseErrorMessage} from 'store'
import {State} from 'globalInterfaces'

import {Message, ButtonsWrapper, ButtonWrapper} from './style'

const ConfirmLogoutModal: FC = () => {
  const dispatch = useDispatch()
  const {isConfirmLogoutModalVisible} = useSelector((state: State) => state.modals)

  const logoutHandler = () => {
    dispatch(logout())
    dispatch(hideResponseErrorMessage())
    dispatch(hideConfirmLogoutModal())
  }

  return (
    <Modal show={isConfirmLogoutModalVisible}>
      <Message>Do you really want to logout?</Message>
      <ButtonsWrapper>
        <ButtonWrapper>
          <Button onClick={() => dispatch(hideConfirmLogoutModal())}>No</Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={logoutHandler}>Yes</Button>
        </ButtonWrapper>
      </ButtonsWrapper>
    </Modal>
  )
}

export default ConfirmLogoutModal