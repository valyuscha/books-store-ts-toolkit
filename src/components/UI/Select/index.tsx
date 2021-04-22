import React, {FC, Children, ChangeEvent} from 'react'

import {Label, SelectElem, Option} from './style'

interface SelectProps {
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
  optionsArr: string[]
}

const Select: FC<SelectProps> = (props) => (
  <>
    <Label>{props.label}</Label>
    <SelectElem
      value={props.value}
      onChange={props.onChange}>
      {Children.toArray(props.optionsArr.map(option => <Option>{option}</Option>))}
    </SelectElem>
  </>
)

export default Select