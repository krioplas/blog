import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchCreateArticles } from '../../Redux/reducers/createArticlesSlice';
import { signIn, homePage } from '../../routes/pathLink';

import stlCrArt from './CreateArticle.module.scss';

export default function CreateArticle() {
  const dispatch = useDispatch();
  const home = useHistory();
  const isAuth = localStorage.getItem('token');
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  if (isAuth === null) {
    home.push(signIn);
  }
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const onSubmit = (formData) => {
    const articleText = {
      article: {
        title: formData.title,
        description: formData.description,
        body: formData.text,
        tagList: formData.tags.map((tag) => tag.name),
      },
    };
    dispatch(fetchCreateArticles(articleText));
    home.push(homePage);
  };

  return (
    <div className={stlCrArt.createcontent}>
      <h3 className={stlCrArt.createcontent__title}>Create new article</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={stlCrArt.labelcontain__label}>
            <label htmlFor='title'>
              Title
              <input
                name='title'
                type='text'
                placeholder='Title'
                className={`${stlCrArt.labelcontain__input} ${stlCrArt.createcontent__input}`}
                {...register('title', {
                  required: 'Не должен быть пустым',
                  minLength: 1,
                })}
              />
              {errors.title && (
                <p className={stlCrArt.labelcontain__error}>
                  {errors.title.message}
                </p>
              )}
            </label>
          </div>
          <div className={stlCrArt.labelcontain__label}>
            <label htmlFor='description'>
              Short description
              <input
                name='description'
                type='text'
                placeholder='Short description'
                className={`${stlCrArt.labelcontain__input} ${stlCrArt.createcontent__input}`}
                {...register('description', {
                  required: 'Не должен быть пустым',
                  minLength: 1,
                })}
              />
              {errors.description && (
                <p className={stlCrArt.labelcontain__error}>
                  {errors.description.message}
                </p>
              )}
            </label>
          </div>
          <div className={stlCrArt.labelcontain__label}>
            <label htmlFor='text'>
              Text
              <textarea
                name='text'
                type='text'
                placeholder='Text'
                className={`
                ${stlCrArt.labelcontain__input}
                 ${stlCrArt.createcontent__input}
                 ${stlCrArt.createcontent__input_text}`}
                {...register('text', {
                  required: 'Не должен быть пустым',
                  minLength: 1,
                  maxLength: 5000,
                })}
              />
              {errors.text && (
                <p className={stlCrArt.labelcontain__error}>
                  {errors.text.message}
                </p>
              )}
            </label>
          </div>
          <p className={stlCrArt.createcontent__info}>Tags</p>
          <div className={stlCrArt.createcontent__tags}>
            {fields.map((tag, index) => (
              <div key={tag.id} className={stlCrArt.createcontent__tags_field}>
                <input
                  className={`${stlCrArt.labelcontain__input} ${stlCrArt.createcontent__input_tags}`}
                  {...register(`tags.${index}.name`, {
                    required: 'Не должен быть пустым',
                  })}
                  defaultValue={tag.name}
                />
                {errors.tags && errors.tags[index] && (
                  <p className={stlCrArt.labelcontain__error}>{`Tag ${
                    index + 1
                  } is required`}</p>
                )}
                <button
                  type='button'
                  onClick={() => remove(index)}
                  className={stlCrArt.createcontent__deltag}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={() => append({ name: '' })}
              className={stlCrArt.createcontent__addtag}
            >
              Add tag
            </button>
          </div>

          <input
            type='submit'
            value='Send'
            className={stlCrArt.labelcontain__submitbtn}
          />
        </form>
      </div>
    </div>
  );
}
