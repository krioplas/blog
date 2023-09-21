import { Route, Switch, Redirect } from 'react-router-dom';

import Header from '../Header/Header';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import Articles from '../Articles/Articles';
import ArticleDetails from '../ArticleDetails/ArticleDetails';
import UpdateUser from '../UpdateUser/UpdateUser';
import CreateArticle from '../CreateArticle/CreateArticle';
import EditArticle from '../ArticleEdit/ArticleEdit';
import {
  signIn,
  signUp,
  newArticle,
  homePage,
  profile,
  articlesSlug,
  editArticle,
} from '../../routes/pathLink';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
          <Route path={homePage} component={Articles} exact />
          <Route path={signUp} component={RegisterForm} />
          <Route path={signIn} component={LoginForm} />
          <Route
            path={`${articlesSlug}:slug`}
            component={ArticleDetails}
            exact
          />
          <Route path={profile} component={UpdateUser} />
          <Route path={newArticle} component={CreateArticle} />
          <Route path={editArticle} component={EditArticle} />
          <Redirect to={homePage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
