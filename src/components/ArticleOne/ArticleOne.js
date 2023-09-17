import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { fetchArticleDetails } from '../../Redux/reducers/articleDetailsSlice';

import stlArt from './ArticleOne.module.scss';

function ArticleOne(props) {
  const dispatch = useDispatch();

  const article = props.data;
  return (
    <div>
      <div className={stlArt.header}>
        <div className={stlArt.headContent}>
          <div className={stlArt.title}>
            <Link
              className={stlArt.title_text}
              to={`/articles/${article.slug}`}
              onClick={() => {
                dispatch(fetchArticleDetails(article.slug));
              }}
            >
              <div>{article.title}</div>
            </Link>
            <button type='button' className={stlArt.title_like}>
              {article.favorited ? <span>❤️️</span> : <span>🤍</span>}
              {article.favoritesCount}
            </button>
          </div>
          <div className={stlArt.tagList}>
            {article.tagList.map((el) => (
              <span key={Math.random() * 100} className={stlArt.tag}>
                {el}
              </span>
            ))}
          </div>
        </div>
        <div className={stlArt.userInfo}>
          <div className={stlArt.userInfo_name}>
            <span>{article.author.username}</span>
            <span>{format(new Date(article.createdAt), 'MMMM dd, yyyy')}</span>
          </div>
          <img
            src={article.author.image}
            alt='ava'
            className={stlArt.avatarImg}
          />
        </div>
      </div>
      <div className={stlArt.description}>{article.description}</div>
    </div>
  );
}

export default ArticleOne;
