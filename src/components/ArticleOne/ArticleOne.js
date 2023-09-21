import { Link } from 'react-router-dom';
import { useState } from 'react';
import format from 'date-fns/format';
import { useDispatch, useSelector } from 'react-redux';

import { fetchArticlesFavorite } from '../../Redux/reducers/articlesFavoriteSlice';
import { fetchArticlesUnFavorite } from '../../Redux/reducers/articlesUnFavoriteSlice';
// import { fetchArticleDetails } from '../../Redux/reducers/articleDetailsSlice';
import { articlesSlug } from '../../routes/pathLink';

import stlArt from './ArticleOne.module.scss';

export default function ArticleOne(props) {
  const {
    slug,
    title,
    favoritesCount,
    favorited,
    description,
    tagList,
    createdAt,
    author,
  } = props.data;

  const user = useSelector((state) => state.loginSlice.user);
  const dispatch = useDispatch();
  const [likesCount, setLikesCount] = useState(favoritesCount);
  const [isLiked, setIsLiked] = useState(favorited);
  const onLikeClick = () => {
    if (isLiked) {
      setLikesCount(likesCount - 1);
      dispatch(fetchArticlesUnFavorite(slug));
    } else {
      setLikesCount(likesCount + 1);
      dispatch(fetchArticlesFavorite(slug));
    }
    setIsLiked(!isLiked);
  };
  const handleImageError = (event) => {
    event.target.src =
      'https://img.icons8.com/fluency-systems-regular/48/no-user-alt.png';
  };
  return (
    <div className={stlArt.article}>
      <div className={stlArt.article__info}>
        <div className={stlArt.article__info_block}>
          <Link to={articlesSlug + slug} className={stlArt.article__info_title}>
            {title}
          </Link>
          {user ? (
            <button
              type='button'
              onClick={onLikeClick}
              className={stlArt.article__info_likes}
            >
              {isLiked ? '❤️' : '🤍'} {likesCount}
            </button>
          ) : (
            <button type='button' className={stlArt.article__info_noaccess}>
              🤍
              {likesCount}
            </button>
          )}
        </div>
        <div className={stlArt.article__info_tagfield}>
          {tagList?.map((el) => {
            if (tagList.length > 0) {
              return (
                <span
                  key={Math.random() * 10}
                  className={stlArt.article__info_tags}
                >
                  {el}
                </span>
              );
            }
            return el;
          })}
        </div>
        <p className={stlArt.article__info_description}>{description}</p>
      </div>
      <div className={stlArt.article__user}>
        <div>
          <div className={stlArt.article__user_author}>{author.username}</div>
          <div className={stlArt.article__user_date}>
            {createdAt ? format(new Date(createdAt), 'MMM dd, yyyy') : null}
          </div>
        </div>
        <img
          onError={handleImageError}
          id='img'
          className={stlArt.article__user_photo}
          src={
            author.image === undefined
              ? 'https://img.icons8.com/fluency-systems-regular/48/no-user-alt.png'
              : author.image
          }
          alt='ava'
        />
      </div>
    </div>
  );
}
