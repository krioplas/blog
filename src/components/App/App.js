import { Routes, Route } from 'react-router-dom';

import Header from '../Header/Header';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import Articles from '../Articles/Articles';
import ArticleDetails from '../ArticleDetails/ArticleDetails';

import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.App}>
      <Header />
      <div className={classes.block}>
        <Routes>
          <Route path='/' element={<Articles />} />
          <Route path='/sign-up' element={<RegisterForm />} />
          <Route path='/sign-in' element={<LoginForm />} />
          <Route path='/articles/:slug' element={<ArticleDetails />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
