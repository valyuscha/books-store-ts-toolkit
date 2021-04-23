import React, {FC, ReactChild, MouseEvent} from 'react'

import {ButtonElem} from './style'

interface ButtonProps {
  btnType?: 'purple'
  onClick: (event?: MouseEvent) => void
  children: ReactChild
}

const Button: FC<ButtonProps> = (props) => (
  <ButtonElem btnType={props.btnType || ''} onClick={props.onClick}>
    {props.children}
  </ButtonElem>
)

export default Button