import React, {FC, ChangeEvent, FocusEvent} from 'react'
import {searchIcon} from 'assets'

import {InputWrapper, Label, Field, ErrorMessage, SearchIcon} from './style'

interface InputProps {
  fieldType: 'login' | 'search'
  isValid?: boolean
  isTouched?: boolean
  label?: string
  type: string
  value: string
  placeholder?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void
  errorMessage?: string
}

const Input: FC<InputProps> = (props) => (
  <InputWrapper>
    <Label
      fieldType={props.fieldType}
      isValid={props.isValid && true}
      isTouched={props.isTouched && true}>
      {props.label}
    </Label>
    <Field
      type={props.type}
      fieldType={props.fieldType}
      value={props.value}
      isValid={props.isValid && true}
      isTouched={props.isTouched && true}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onBlur={props.onBlur} />
    <SearchIcon
      src={searchIcon}
      fieldType={props.fieldType} />
    <ErrorMessage
      isValid={props.isValid && true}
      isTouched={props.isTouched}>
      {props.errorMessage}
    </ErrorMessage>
  </InputWrapper>
)

export default Input