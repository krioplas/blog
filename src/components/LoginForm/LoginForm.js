import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import { fetchLogin, clearError } from '../../Redux/reducers/loginSlice';
import { signUp, homePage } from '../../routes/pathLink';

import stlRegForm from './LoginForm.module.scss';

function LoginForm() {
  const dispatch = useDispatch();
  const home = useHistory();
  const error = useSelector((state) => state.loginSlice.error);
  const user = useSelector((state) => state.loginSlice.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    dispatch(clearError());
    if (user) {
      home.push(homePage);
    }
  }, [dispatch, home, user]);
  const onSubmit = (data) => {
    dispatch(
      fetchLogin({
        user: data,
      }),
    );
  };

  return (
    <form className={stlRegForm.register} onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>
      {error !== '' ? (
        <span style={{ color: 'red' }}>
          Неверное имя пользователя или пароль!
        </span>
      ) : null}
      <div className={stlRegForm.register_inputs}>
        <label>Email address</label>
        <input
          {...register('email', {
            required: 'Не должен быть пустым',
          })}
          type='email'
          placeholder='Email address'
          className={stlRegForm.register_input}
        />
        {errors.email && (
          <span style={{ color: 'red' }}>{errors.email.message}</span>
        )}
        <label>Password</label>
        <input
          type='password'
          placeholder='Password'
          className={stlRegForm.register_input}
          {...register('password', {
            required: 'Не должен быть пустым',
          })}
        />
        {errors.password && (
          <span style={{ color: 'red' }}>{errors.password.message}</span>
        )}
      </div>

      <input type='submit' value='Login' className={stlRegForm.buttonReg} />

      <span className={stlRegForm.footer}>
        Don’t have an account? <Link href={signUp}> Sign Up</Link>.
      </span>
    </form>
  );
}

export default LoginForm;
