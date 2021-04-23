import React, {ComponentType, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {errorIcon, hideErrorMessage} from 'assets'
import {hideResponseErrorMessage} from 'store'
import {State} from 'globalInterfaces'

import {
  ErrorIcon,
  ErrorMessageWrapper,
  HideMessageButton,
  HideMessageIcon,
  Message,
  MessageWrapper
} from './style'

function ErrorBoundary<P>(Component: ComponentType<P>) {
  return (props: P) => {
    const dispatch = useDispatch()
    const {isResponseErrorMessageVisible} = useSelector(
      (state: State) => state.responseErrorMessage
    )

    useEffect(() => {
      let closeMessageTimeOut: ReturnType<typeof setTimeout>

      if (isResponseErrorMessageVisible) {
        closeMessageTimeOut = setTimeout(() => {
          dispatch(hideResponseErrorMessage())
        }, 10000)
      }

      return () => {
        if (isResponseErrorMessageVisible) {
          clearTimeout(closeMessageTimeOut)
        }
      }
    }, [isResponseErrorMessageVisible])

    return (
      <>
        <Component {...props} />
        <ErrorMessageWrapper show={isResponseErrorMessageVisible}>
          <MessageWrapper>
            <ErrorIcon src={errorIcon} />
            <Message>
              Ooooops. Something went wrong. Try again a little bit later.
            </Message>
          </MessageWrapper>
          <HideMessageButton onClick={() => dispatch(hideResponseErrorMessage())}>
            <HideMessageIcon src={hideErrorMessage} />
          </HideMessageButton>
        </ErrorMessageWrapper>
      </>
    )
  }
}

export default ErrorBoundary