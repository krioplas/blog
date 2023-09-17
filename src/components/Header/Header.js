import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux/es/hooks/useSelector';

import stlHead from './Header.module.scss';

function Header() {
  const token = localStorage.getItem('currentUser');
  return (
    <div className={stlHead.Header}>
      <Link to='/' className={stlHead.Header_logo}>
        Realworld Blog
      </Link>
      {token === null ? <FormAuthorization /> : <FormAuthorized data={token} />}
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

function FormAuthorized(props) {
  return (
    <div className={stlHead.Header_authentication}>
      <Link to='/' className={stlHead.create_article}>
        Create article
      </Link>
      {props.user.username}
      <button
        type='button'
        onClick={() => {
          localStorage.clear();
        }}
      >
        Log Out
      </button>
    </div>
  );
}
