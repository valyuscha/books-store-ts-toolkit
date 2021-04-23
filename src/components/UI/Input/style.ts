import styled from 'styled-components'
import {colors} from 'assets'

interface StyleInputProps {
  fieldType?: 'login' | 'search'
  isValid?: boolean
  isTouched?: boolean
}

export const InputWrapper = styled.div`
  position: relative;
`

export const Label = styled.label<StyleInputProps>`
  display: block;
  font-size: 15px;
  margin: 0 0 10px 5px;
  
  ${p => p.fieldType === 'login' ? `
    color: ${!p.isValid && p.isTouched ? colors.red : colors.global};
  ` : p.fieldType === 'search' ? `
    color: ${colors.black};
    font-weight: 600;
  ` : ''};
`

export const Field = styled.input<StyleInputProps>`
  width: 100%;
  font-size: 14px;
  border-radius: 10px;
  box-sizing: border-box;
  
  &::placeholder {
    color: ${colors.black};
  }

  ${p => p.fieldType === 'login' ? `
    border: 2px solid ${!p.isValid && p.isTouched ? colors.red : colors.global};
    padding: 10px 15px;
  ` : p.fieldType === 'search' ? `
    border: 2px solid ${colors.black};
    padding: 10px 15px 10px 35px;
  ` : ''};
`

export const ErrorMessage = styled.p<StyleInputProps>`
  font-size: 12px;  
  color: ${colors.red};
  margin: 5px 5px 0 0;
  text-align: right;
  opacity: ${p => !p.isValid && p.isTouched ? 1 : 0};
`

export const SearchIcon = styled.img<StyleInputProps>`
  display: ${({fieldType}) => fieldType === 'search' ? 'block' : 'none'};
  width: 17px;
  height: 17px;
  position: absolute;
  top: 58%;
  left: 15px;
`