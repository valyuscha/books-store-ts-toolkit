import React, {FC, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {State} from 'globalInterfaces'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LoginPage, BooksCatalogPage, BookInfoPage, CartPage} from 'pages'
import {getAllBooks} from 'store'

const App: FC = () => {
  const dispatch = useDispatch()
  const {isLoggedIn} = useSelector((state: State) => state.login)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllBooks())
    }
  }, [isLoggedIn])

  if (!isLoggedIn) {
    return (
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Redirect to="/login" />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route path="/cart" component={CartPage} />
        <Route path="/catalog/:id" component={BookInfoPage} />
        <Route path="/catalog" component={BooksCatalogPage} />
        <Redirect to="/catalog" />
      </Switch>
    )
  }
}

export default App
