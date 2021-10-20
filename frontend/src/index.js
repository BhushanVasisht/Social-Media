import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import NewPost from './components/NewPost';
import {BrowserRouter, Switch, Route } from 'react-router-dom';
import {Container, Nav, Navbar} from "react-bootstrap";
import Auth from "./components/Auth";

ReactDOM.render(
  <BrowserRouter>
      <Navbar bg="dark" variant="dark">
          <Container>
              <Navbar.Brand href="/">
                  <img alt=""
                       src="./logo.png"
                       width="30"
                       height="30"
                       className="d-inline-block align-top" />{' '}
                  Social Media
              </Navbar.Brand>

              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                      <Nav.Link href="/">Home</Nav.Link>
                      <Nav.Link href="/post">New Post</Nav.Link>
                  </Nav>
              </Navbar.Collapse>

              <Navbar.Collapse className="justify-content-end">
                  <Auth />
              </Navbar.Collapse>
          </Container>
      </Navbar>

      <br/>

      <Switch>
          <Route path="/post">
              <NewPost />
          </Route>
          <Route path="/">
              <Home />
          </Route>
          <Route path="">
              <Home />
          </Route>
      </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
