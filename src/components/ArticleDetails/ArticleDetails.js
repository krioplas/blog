import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';

import ArticleOne from '../ArticleOne/ArticleOne';

import stlArtDet from './ArticleDetails.module.scss';

function ArticleDetails() {
  const article = useSelector((state) => state.articleDetailsSlice.article);
  const load = useSelector((state) => state.articleDetailsSlice.load);
  if (load) {
    return <div>Загрузка</div>;
  }
  return (
    <article className={stlArtDet.container}>
      <ArticleOne data={article} />
      <ReactMarkdown>{article.body}</ReactMarkdown>
    </article>
  );
}

export default ArticleDetails;
