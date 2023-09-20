import { Route } from 'react-router-dom';

import Header from '../Header/Header';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import Articles from '../Articles/Articles';
import ArticleDetails from '../ArticleDetails/ArticleDetails';
import UpdateUser from '../UpdateUser/UpdateUser';
import CreateArticle from '../CreateArticle/CreateArticle';
import EditArticle from '../ArticleEdit/ArticleEdit';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Route path='/' component={Articles} exact />
        <Route path='/sign-up' component={RegisterForm} />
        <Route path='/sign-in' component={LoginForm} />
        <Route path='/articles/:slug' component={ArticleDetails} exact />
        <Route path='/profile' component={UpdateUser} />
        <Route path='/new-article' component={CreateArticle} />
        <Route path='/articles/:slug/edit' component={EditArticle} />
      </div>
    </div>
  );
}

export default App;
