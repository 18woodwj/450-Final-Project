import React from 'react';
import ReactDOM from 'react-dom';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';

import 'antd/dist/antd.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"

import WrappedPage from './pages/WrappedPage';
import ChartsPage from './pages/ChartsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SavedPage from './pages/SavedPage';
import SongsPage from './pages/SongsPage';

ReactDOM.render(
  <div>
    <Router>
      <Switch>
        <Route exact
							path="/songs"
							render={() => (
								<SongsPage />
							)}/>
        <Route exact
							path="/saved"
							render={() => (
								<SavedPage />
							)}/>
        <Route exact
							path="/charts"
							render={() => (
								<ChartsPage />
							)}/>
		<Route exact
							path="/wrapped"
							render={() => (
								<WrappedPage />
							)}/>
		<Route exact
							path="/login"
							render={() => (
								<LoginPage />
							)}/>
		<Route exact
							path="/register"
							render={() => (
								<RegisterPage />
							)}/>
      </Switch>
    </Router>
  </div>,
  document.getElementById('root')
);

