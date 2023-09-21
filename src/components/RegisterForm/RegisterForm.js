import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { signIn } from '../../routes/pathLink';
import { clearData, fetchRegister } from '../../Redux/reducers/registerSlice';

import stlRegForm from './RegisterForm.module.scss';

function RegisterForm() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.registerSlice.status);
  const error = useSelector((state) => state.registerSlice.error);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onChange' });
  const onSubmit = (data) =>
    dispatch(
      fetchRegister({
        user: {
          username: data.username,
          email: data.email,
          password: data.password,
          bio: 'test user Loginov',
          image: 'https://img.icons8.com/nolan/64/user.png',
        },
      }),
    );
  useEffect(() => {
    dispatch(clearData());
  }, [dispatch]);
  if (status === 'resolve') {
    return (
      <div className={stlRegForm.message}>
        Регистрация успешно завершена!
        <Link to={signIn} style={{ fontSize: '18px' }}>
          Sign In
        </Link>
      </div>
    );
  }
  return (
    <form className={stlRegForm.register} onSubmit={handleSubmit(onSubmit)}>
      <h2>Create new account</h2>
      {error !== '' ? (
        <span style={{ color: 'red' }}>Такой логин или почта недоступны!</span>
      ) : null}
      <div className={stlRegForm.register_inputs}>
        <label htmlFor='Username'>Username</label>
        <input
          {...register('username', {
            required: 'Не должен быть пустым',
            minLength: {
              value: 3,
              message: 'Minimum 2 symbols',
            },
            maxLength: {
              value: 20,
              message: 'Maximum 12 symbols',
            },
          })}
          type='text'
          id='Username'
          placeholder='Username'
          className={stlRegForm.register_input}
        />
        {errors.username && (
          <span className='form__message' style={{ color: 'red' }}>
            {errors.username.message}
          </span>
        )}
        <label>Email address</label>
        <input
          {...register('email', {
            required: 'Не должен быть пустым',
            minLength: {
              value: 6,
              message: 'Minimum 6 symbols',
            },
            maxLength: {
              value: 40,
              message: 'Maximum 40 symbols',
            },
          })}
          type='email'
          placeholder='Email address'
          className={stlRegForm.register_input}
        />
        {errors.email && (
          <span className='form__message' style={{ color: 'red' }}>
            {errors.email.message}
          </span>
        )}
        <label>Password</label>
        <input
          type='password'
          placeholder='Password'
          className={stlRegForm.register_input}
          {...register('password', {
            required: 'Не должен быть пустым',
            minLength: {
              value: 6,
              message: 'Password must have at least 6 characters',
            },
          })}
        />
        {errors.password && (
          <span className='form__message' style={{ color: 'red' }}>
            {errors.password.message}
          </span>
        )}
        <label>Repeat Password</label>
        <input
          type='password'
          placeholder='Password'
          className={stlRegForm.register_input}
          {...register('password_repeat', {
            validate: (value) =>
              value === watch('password') || 'The passwords do not match',
          })}
        />
        {errors.password_repeat && (
          <span className='form__message' style={{ color: 'red' }}>
            {errors.password_repeat.message}
          </span>
        )}
      </div>
      <div className={stlRegForm.register_agree}>
        <div className={stlRegForm.register_footer}>
          <input
            type='checkbox'
            id='agree'
            name='agree'
            className={stlRegForm.check}
            required
          />
          <label htmlFor='agree'>
            I agree to the processing of my personal information
          </label>
        </div>
        <input type='submit' value='Create' className={stlRegForm.buttonReg} />
      </div>
      <span className={stlRegForm.footer}>
        Already have an account? <Link to={signIn}>Sign In</Link>
      </span>
    </form>
  );
}

export default RegisterForm;
