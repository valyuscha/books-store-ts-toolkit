import React, {FC, useState, MouseEvent, FocusEvent, ChangeEvent} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ErrorBoundary} from 'hoc'
import {Button, Input, Loader} from 'components/UI'
import {checkValidity} from 'utils'
import {auth} from 'store'
import {State} from 'globalInterfaces'
import {getUserNameErrorMessage} from './getUserNameErrorMessage'

import {
  Form,
  LoginBlockWrapper,
  LoginPageWrapper,
  SubmitButtonWrapper,
  Title
} from './style'

const login: FC = () => {
  const dispatch = useDispatch()
  const {isLoading} = useSelector((state: State) => state.loader)

  const [nameControl, setNameControl] = useState({
    value: '',
    isValid: false,
    isTouched: false,
    errorMessage: 'Enter the field',
    rules: {
      required: true,
      minLength: 4,
      maxLength: 16
    }
  })

  type FormEvent = ChangeEvent | FocusEvent

  const getValidUserName = (event: FormEvent, isBlurHandler?: boolean) => {
    const control = {...nameControl}
    const target = event.target as HTMLTextAreaElement

    control.value = target.value
    control.isValid = checkValidity(control.value, control.rules)
    control.errorMessage = getUserNameErrorMessage(control.value)

    if (isBlurHandler) {
      control.isTouched = true
    }

    setNameControl(control)
  }

  const changeHandler = (event: FormEvent) => {
    getValidUserName(event)
  }

  const blurHandler = (event: FormEvent) => {
    getValidUserName(event, true)
  }

  const submitHandler = (event: MouseEvent | undefined) => {
    if (event) event.preventDefault()
    const control = {...nameControl}
    control.isTouched = true

    if (control.isValid) {
      dispatch(auth(control.value))
    }

    setNameControl(control)
  }

  return (
    <LoginPageWrapper>
      {!isLoading ? (
        <LoginBlockWrapper>
          <Title>Welcome to JS Band Store</Title>
          <Form>
            <Input
              type="text"
              fieldType="login"
              label="Name"
              placeholder="John Adams"
              value={nameControl.value}
              isValid={nameControl.isValid}
              isTouched={nameControl.isTouched}
              errorMessage={nameControl.errorMessage}
              onChange={changeHandler}
              onBlur={blurHandler} />
            <SubmitButtonWrapper>
              <Button onClick={submitHandler}>Log in</Button>
            </SubmitButtonWrapper>
          </Form>
        </LoginBlockWrapper>
      ) : <Loader />}
    </LoginPageWrapper>
  )
}

const LoginPage = ErrorBoundary(login)

export default LoginPage