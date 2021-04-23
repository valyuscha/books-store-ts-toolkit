import React from 'react'
import CircleLoader from 'react-spinners/CircleLoader'
import {LoaderWrapper} from './style'

const Loader = () => (
  <LoaderWrapper>
    <CircleLoader color="#fff" />
  </LoaderWrapper>
)

export default Loader