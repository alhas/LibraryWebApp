import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Container } from '@material-ui/core';
import Home from './components/user/Home';
import Header from './components/user/Header';
import BooksList from './components/user/BooksList'
import TheBookView from './components/user/TheBookView';
import AdminPanel from './components/admin/AdminPanel';




function App() {

  return (
    <>

      <CssBaseline>
        <Container>
          <Header />
          <Switch>

            <Route path="/books" component={BooksList} />


            <Route path="/book/:id" component={TheBookView} />

            <Route exact path="/" component={Home} />


          </Switch>


        </Container>
      </CssBaseline>
      {/* Admin */}
      <Container>

        <Switch>
          
          <Route path='/admin'>
            <AdminPanel />
          </Route>
        </Switch>

      </Container>



    </>
  );
}

export default App;
