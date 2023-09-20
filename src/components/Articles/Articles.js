import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import { fetchArticleList } from '../../Redux/reducers/articlesSlice';
import ArticleOne from '../ArticleOne/ArticleOne';

import stlArticles from './Articles.module.scss';

function Articles() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.articlesSlice.articles);
  const status = useSelector((state) => state.articlesSlice.status);
  const articlesCount = useSelector(
    (state) => state.articlesSlice.articlesCount,
  );

  useEffect(() => {
    dispatch(fetchArticleList(count));
  }, [dispatch, count]);
  const articleOne = articles.map((el) => (
    <div className={stlArticles.articles_one} key={el.slug}>
      {' '}
      <ArticleOne data={el} />
    </div>
  ));

  return (
    <div className={stlArticles.content}>
      <div className={stlArticles.articles}>
        {status === 'pending' ? (
          <Box sx={{ display: 'flex' }} className={stlArticles.spin}>
            <CircularProgress />
          </Box>
        ) : (
          articleOne
        )}
      </div>
      <Pagination
        className={stlArticles.pagination}
        count={Math.ceil(articlesCount / 5)}
        shape='rounded'
        color='primary'
        onChange={(click, page) => setCount(page * 5 - 5)}
      />
    </div>
  );
}

export default Articles;
