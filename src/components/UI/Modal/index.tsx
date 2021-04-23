import React, {FC, ReactNode} from 'react'

import {ModalContentWrapper, ModalWrapper} from './style'

interface ModalProps {
  children: ReactNode
  show: boolean
}

const Modal: FC<ModalProps> = (props) => (
  <ModalWrapper show={props.show}>
    <ModalContentWrapper>
      {props.children}
    </ModalContentWrapper>
  </ModalWrapper>
)

export default Modal