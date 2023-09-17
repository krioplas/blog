import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { fetchLogin } from '../../Redux/reducers/loginSlice';

import stlRegForm from './LoginForm.module.scss';

function LoginForm() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) =>
    dispatch(
      fetchLogin({
        user: data,
      }),
    );
  return (
    <form className={stlRegForm.register} onSubmit={handleSubmit(onSubmit)}>
      <h2>Sign In</h2>
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
        Don’t have an account? <a href='/#'> Sign Up</a>.
      </span>
    </form>
  );
}

export default LoginForm;
