import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

import { fetchArticleList } from '../../Redux/reducers/articlesSlice';
import ArticleOne from '../ArticleOne/ArticleOne';

import stlArticles from './Articles.module.scss';

function Articles() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesSlice.articles);
  const articlesCount = useSelector(
    (state) => state.articlesSlice.articlesCount,
  );

  useEffect(() => {
    dispatch(fetchArticleList(count));
  }, [dispatch, count]);

  const articleOne = articles.map((el) => (
    <article className={stlArticles.articleOne} key={el.slug}>
      <ArticleOne data={el} />
    </article>
  ));
  return (
    <div className={stlArticles.container}>
      {articleOne}
      <Pagination
        count={Math.ceil(articlesCount / 5)}
        shape='rounded'
        color='primary'
        onChange={(click, page) => setCount(page * 5 - 5)}
      />
    </div>
  );
}

export default Articles;
