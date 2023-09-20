import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { clearToken } from '../../Redux/reducers/loginSlice';

import stlHead from './Header.module.scss';

function Header() {
  const user = useSelector((state) => state.loginSlice.user);
  return (
    <div className={stlHead.Header}>
      <Link to='/' className={stlHead.Header_logo}>
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
      <Link to='/sign-in' className={stlHead.authorization}>
        Sign In
      </Link>
      <Link to='/sign-up' className={stlHead.registration}>
        Sign Up
      </Link>
    </div>
  );
}

function FormAuthorized() {
  const dispatch = useDispatch();
  const homePage = useHistory();
  const userInfo = JSON.parse(localStorage.getItem('data'));
  const avatar = localStorage.getItem('profileImage');
  return (
    <div className={stlHead.Header_authentication}>
      <Link to='/new-article' className={stlHead.create_article}>
        Create article
      </Link>
      <Link to='/profile' className={stlHead.username}>
        {userInfo.user.username}

        <img
          src={
            avatar === undefined
              ? userInfo.user.image
              : 'https://img.icons8.com/fluency-systems-regular/48/no-user-alt.png'
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
          homePage.push('/');
        }}
      >
        Log Out
      </button>
    </div>
  );
}
