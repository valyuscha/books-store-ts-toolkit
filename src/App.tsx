import React, {FC} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {LoginPage} from 'pages'

const App: FC = () => {
  return (
    <Switch>
      <Route path="/login" component={LoginPage} />
      <Redirect to="/login" />
    </Switch>
  )
}

export default App
