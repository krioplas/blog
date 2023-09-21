import { useForm, useFieldArray } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { fetchEditArticle } from '../../Redux/reducers/articleEditSlice';

import stlEdArt from './ArticleEdit.module.scss';

export default function EditArticle() {
  const article = useSelector((state) => state.articleDetailsSlice.article);
  localStorage.setItem('slug', article.slug);
  const slug = localStorage.getItem('slug');
  const isAuth = localStorage.getItem('token');
  const dispatch = useDispatch();
  const homePage = useHistory();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  if (isAuth === null) {
    homePage.push('/sign-in');
  }
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });
  const onSubmit = (newData) => {
    const newTags = newData.newTags ? [newData.newTags] : [];
    const tagList = [...newData.tags.map((tag) => tag.name), ...newTags];
    const newArticleText = {
      article: {
        title: newData.title,
        description: newData.description,
        body: newData.text,
        tagList,
      },
    };
    dispatch(fetchEditArticle({ newArticleText, slug }));
    homePage.push('/');
  };

  return (
    <div className={stlEdArt.createcontent}>
      <h3 className={stlEdArt.createcontent__title}>Edit article</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={stlEdArt.labelcontain__label}>
            <label htmlFor='title'>
              Title
              <input
                name='title'
                defaultValue={article.title}
                type='text'
                placeholder='Title'
                className={`${stlEdArt.labelcontain__input} ${stlEdArt.createcontent__input}`}
                {...register('title', {
                  required: 'Не должен быть пустым',
                  minLength: 1,
                })}
              />
              {errors.title && (
                <p className={stlEdArt.labelcontain__error}>
                  {errors.title.message}
                </p>
              )}
            </label>
          </div>
          <div className={stlEdArt.labelcontain__label}>
            <label htmlFor='description'>
              Short description
              <input
                name='description'
                defaultValue={article.description}
                type='text'
                placeholder='Short description'
                className={`${stlEdArt.labelcontain__input} ${stlEdArt.createcontent__input}`}
                {...register('description', {
                  required: 'Не должен быть пустым',
                  minLength: 1,
                })}
              />
              {errors.description && (
                <p className={stlEdArt.labelcontain__error}>
                  {errors.description.message}
                </p>
              )}
            </label>
          </div>
          <div className={stlEdArt.labelcontain__label}>
            <label htmlFor='text'>
              Text
              <textarea
                name='text'
                defaultValue={article.body}
                type='text'
                placeholder='Text'
                className={`
                ${stlEdArt.labelcontain__input} 
                ${stlEdArt.createcontent__input} 
                ${stlEdArt.createcontent__input_text}`}
                {...register('text', {
                  required: 'Не должен быть пустым',
                  minLength: 1,
                  maxLength: 5000,
                })}
              />
              {errors.text && (
                <p className={stlEdArt.labelcontain__error}>
                  {errors.text.message}
                </p>
              )}
            </label>
          </div>
          <p className={stlEdArt.createcontent__info}>Tags</p>
          <div className={stlEdArt.createcontent__tags}>
            {fields.length > 0 ? (
              fields.map((tag, index) => (
                <div
                  key={tag.id}
                  className={stlEdArt.createcontent__tags_field}
                >
                  <label htmlFor={`tags.${index}.name`}>
                    <input
                      name={`tags.${index}.name`}
                      type='text'
                      className={`${stlEdArt.labelcontain__input} ${stlEdArt.createcontent__input_tags}`}
                      {...register(`tags.${index}.name`, {
                        required: 'Не должен быть пустым',
                      })}
                      defaultValue={article.tagList.name}
                    />
                  </label>
                  {errors.tags && errors.tags[index] && (
                    <p className={stlEdArt.labelcontain__error}>{`Тэг ${
                      index + 1
                    } пустой`}</p>
                  )}
                  <button
                    type='button'
                    onClick={() => remove(index)}
                    className={stlEdArt.createcontent__deltag}
                  >
                    Delete
                  </button>
                  <button
                    type='button'
                    onClick={() => append({ name: '' })}
                    className={stlEdArt.createcontent__addtag}
                  >
                    Add tag
                  </button>
                </div>
              ))
            ) : (
              <button
                type='button'
                onClick={() => append({ name: '' })}
                className={stlEdArt.createcontent__addtag}
              >
                Add tag
              </button>
            )}
          </div>
          <input
            type='submit'
            value='Send'
            className={stlEdArt.labelcontain__submitbtn}
          />
        </form>
      </div>
    </div>
  );
}
