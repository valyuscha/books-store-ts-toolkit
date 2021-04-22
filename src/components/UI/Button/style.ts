import styled from 'styled-components'
import {colors} from 'assets'

type ButtonProps = {
  readonly btnType: string;
}

export const ButtonElem = styled.button<ButtonProps>`
  text-transform: uppercase;
  padding: 10px 15px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  color: ${colors.white};
  font-size: 16px;
  border-radius: 10px;
  background: ${colors.global};
  cursor: pointer;
  
  ${p => p.btnType === 'purple' && `background: ${colors.purple}`};
  
  @media screen and (max-width: 384px) {
    font-size: 14px;
  }
`