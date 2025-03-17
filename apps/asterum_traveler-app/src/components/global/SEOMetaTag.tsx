import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useMetaStore } from '../../store/metaStore';

function SEOMetaTag() {
  const { pathname } = useLocation();

  const { title, description, keyword, image } = useMetaStore();

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keyword.join(', ')} />

      <meta name="robots" content="index,follow" />
      <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* <!-- Open Graph --> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={`${import.meta.env.VITE_APP_URL}${pathname}`} />
      <meta property="og:type" content="website" />

      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <meta name="robots" content="noarchive" />
    </Helmet>
  );
}

export default SEOMetaTag;
