import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { fetchUpdateUser } from '../../Redux/reducers/loginSlice';

import stlUpdateUser from './UpdateUser.module.scss';

export default function UpdateUser() {
  const dispatch = useDispatch();
  const homePage = useHistory();
  const user = useSelector((state) => state.loginSlice.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    const userData = {
      user: {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        image: formData.avatar,
      },
    };
    dispatch(fetchUpdateUser(userData));
    homePage.push('/articles');
  };

  return (
    <div>
      {user ? (
        <div className={stlUpdateUser.content}>
          <h3 className={stlUpdateUser.content__title}>Edit Profile</h3>
          <div className={stlUpdateUser.labelcontain}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={stlUpdateUser.labelcontain__label}>
                <label htmlFor='username'>
                  Username
                  <input
                    name='username'
                    type='text'
                    placeholder='Username'
                    className={stlUpdateUser.labelcontain__input}
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
                  />
                  {errors.username && (
                    <p className={stlUpdateUser.labelcontain__error}>
                      {errors.username.message}
                    </p>
                  )}
                </label>
              </div>
              <div className={stlUpdateUser.labelcontain__label}>
                <label
                  htmlFor='email'
                  className={stlUpdateUser.labelcontain__label}
                >
                  Email address
                  <input
                    name='email'
                    type='text'
                    placeholder='Email address'
                    className={stlUpdateUser.labelcontain__input}
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
                  />
                  {errors.email && (
                    <p className={stlUpdateUser.labelcontain__error}>
                      {errors.email.message}
                    </p>
                  )}
                </label>
              </div>
              <div className={stlUpdateUser.labelcontain__label}>
                <label
                  htmlFor='password'
                  className={stlUpdateUser.labelcontain__label}
                >
                  New Password
                  <input
                    name='password'
                    type='password'
                    placeholder='New Password'
                    min='6'
                    max='40'
                    className={stlUpdateUser.labelcontain__input}
                    {...register('password', {
                      required: 'Не должен быть пустым',
                      minLength: {
                        value: 6,
                        message: 'Password must have at least 6 characters',
                      },
                    })}
                  />
                  {errors.password && (
                    <p className={stlUpdateUser.labelcontain__error}>
                      {errors.password.message}
                    </p>
                  )}
                </label>
              </div>
              <div className={stlUpdateUser.labelcontain__label}>
                <label
                  htmlFor='avatar'
                  className={stlUpdateUser.labelcontain__label}
                >
                  Avatar image (url)
                  <input
                    name='avatar'
                    type='text'
                    placeholder='Avatar image'
                    className={stlUpdateUser.labelcontain__input}
                    {...register('avatar', {
                      required: true,
                      pattern: {
                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                        message: 'Invalid url',
                      },
                    })}
                  />
                  {errors.avatar && (
                    <p className={stlUpdateUser.labelcontain__error}>
                      {errors.avatar.message}
                    </p>
                  )}
                </label>
              </div>
              <input
                type='submit'
                value='Save'
                className={stlUpdateUser.labelcontain__submitbtn}
              />
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
