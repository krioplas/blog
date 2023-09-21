import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { clearToken } from '../../Redux/reducers/loginSlice';
import {
  signIn,
  signUp,
  newArticle,
  profile,
  homePage,
} from '../../routes/pathLink';

import stlHead from './Header.module.scss';

function Header() {
  const user = useSelector((state) => state.loginSlice.user);
  return (
    <div className={stlHead.Header}>
      <Link to={homePage} className={stlHead.Header_logo}>
        Realworld Blog
      </Link>
      {user === null ? <FormAuthorization /> : <FormAuthorized />}
    </div>
  );
}

export default Header;

function FormAuthorization() {
  return (
    <div className={stlHead.Header_authentication}>
      <Link to={signIn} className={stlHead.authorization}>
        Sign In
      </Link>
      <Link to={signUp} className={stlHead.registration}>
        Sign Up
      </Link>
    </div>
  );
}
const handleImageError = (event) => {
  event.target.src =
    'https://img.icons8.com/fluency-systems-regular/48/no-user-alt.png';
};
function FormAuthorized() {
  const dispatch = useDispatch();
  const home = useHistory();
  const userInfo = JSON.parse(localStorage.getItem('data'));

  return (
    <div className={stlHead.Header_authentication}>
      <Link to={newArticle} className={stlHead.create_article}>
        Create article
      </Link>
      <Link to={profile} className={stlHead.username}>
        {userInfo.user.username}

        <img
          onError={handleImageError}
          src={
            userInfo.user.image === undefined
              ? 'https://img.icons8.com/fluency-systems-regular/48/no-user-alt.png'
              : userInfo.user.image
          }
          alt='ava'
          className={stlHead.avatarImg}
        />
      </Link>
      <button
        className={stlHead.logOut}
        type='button'
        onClick={() => {
          localStorage.clear();
          dispatch(clearToken());
          home.push(homePage);
        }}
      >
        Log Out
      </button>
    </div>
  );
}
