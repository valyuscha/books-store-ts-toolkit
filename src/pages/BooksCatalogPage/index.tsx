import React, {FC, useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {ErrorBoundary} from 'hoc'
import {HeaderLayout} from 'layouts'
import {BookCard, BooksCatalogFilters} from 'components'
import {bookIcon} from 'assets'
import {State, IDefaultBook} from 'globalInterfaces'
import {Loader} from 'components/UI'

import {
  BookImg,
  BooksWrapper,
  MainContentWrapper,
  NoBookMessage,
  NoBooksWrapper
} from './style'

const BooksCatalogPage: FC = () => {
  const {allBooks} = useSelector((state: State) => state.books)
  const {isLoading} = useSelector((state: State) => state.loader)
  const [booksForRender, setBooksForRender] = useState<IDefaultBook[]>([])

  useEffect(() => {
    setBooksForRender(allBooks)
  }, [allBooks])

  return (
    <HeaderLayout>
      {!isLoading ? (
        <MainContentWrapper>
          <BooksCatalogFilters filterBooksFnc={setBooksForRender} />
          {booksForRender.length ? (
            <BooksWrapper>
              {booksForRender.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </BooksWrapper>
          ) : (
            <NoBooksWrapper>
              <BookImg src={bookIcon} />
              <NoBookMessage>No books</NoBookMessage>
            </NoBooksWrapper>
          )}
        </MainContentWrapper>
      ) : <Loader />}
    </HeaderLayout>
  )
}

export default ErrorBoundary(BooksCatalogPage)