import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import ArticleOne from '../ArticleOne/ArticleOne';
import { fetchArticleDetails } from '../../Redux/reducers/articleDetailsSlice';
import { fetchDeleteArticles } from '../../Redux/reducers/deleteArticlesSlice';

import stlArtDet from './ArticleDetails.module.scss';

function ArticleDetails() {
  const adres = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchArticleDetails(adres.slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const article = useSelector((state) => state.articleDetailsSlice.article);
  const status = useSelector((state) => state.articleDetailsSlice.status);
  const userInfo = JSON.parse(localStorage.getItem('data'));
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const homePage = useHistory();

  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseYes = () => {
    setOpen(false);
    dispatch(fetchDeleteArticles(article.slug));
    homePage.push('/');
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (status === 'pending' || article.length === 0) {
    return (
      <Box sx={{ display: 'flex' }} className={stlArtDet.spin}>
        <CircularProgress />
      </Box>
    );
  }
  const isAuthor = () => {
    const authorName = userInfo?.user?.username;
    return authorName === article.author.username;
  };
  return (
    <article className={stlArtDet.container}>
      <ArticleOne data={article} />
      <div>
        {isAuthor() ? (
          <div className={stlArtDet.delete}>
            <Button variant='outlined' onClick={handleClickOpen} color='error'>
              Delete
            </Button>
            <Dialog
              fullScreen={fullScreen}
              open={open}
              onClose={handleClose}
              aria-labelledby='responsive-dialog-title'
            >
              <DialogTitle id='responsive-dialog-title'>
                Вы уверены что хотитите удалить запись?
              </DialogTitle>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  НЕТ
                </Button>
                <Button onClick={handleCloseYes} autoFocus>
                  ДА
                </Button>
              </DialogActions>
            </Dialog>
            <Link
              to={`/articles/${article.slug}/edit`}
              className={stlArtDet.edit_article}
            >
              EDIT
            </Link>
          </div>
        ) : null}
      </div>
      <ReactMarkdown>{article.body}</ReactMarkdown>
    </article>
  );
}

export default ArticleDetails;
