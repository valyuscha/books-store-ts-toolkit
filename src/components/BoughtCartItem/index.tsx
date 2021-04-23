import React, {FC} from 'react'
import {ICartBook} from 'globalInterfaces'

import {
  BookTitle,
  BoughtCartItemWrapper,
  TotalCount,
  TotalCountPriceWrapper,
  TotalPrice
} from './style'

interface CartItemProps {
  book?: ICartBook
  firstRow?: boolean
}

const BoughtCartItem: FC<CartItemProps> = ({book, firstRow}) => (
  <BoughtCartItemWrapper>
    <BookTitle firstRow={firstRow || false}>
      {firstRow ? 'Title' : book && book.title}
    </BookTitle>
    <TotalCountPriceWrapper>
      <TotalCount firstRow={firstRow || false}>
        {firstRow ? 'Count' : book && book.addedCount}
      </TotalCount>
      <TotalPrice firstRow={firstRow || false}>
        {firstRow ? 'Total' : book && book.currentBookTotalPrice}
      </TotalPrice>
    </TotalCountPriceWrapper>
  </BoughtCartItemWrapper>
)

export default BoughtCartItem