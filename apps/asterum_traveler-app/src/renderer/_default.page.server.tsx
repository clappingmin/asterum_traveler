import { escapeInject } from 'vite-plugin-ssr/server';
import { ServerStyleSheet } from 'styled-components';
import { PageContextServer } from './types';
import { baseMeta } from '@/shared/constants';

export { render };

async function render(pageContext: PageContextServer) {
  const sheet = new ServerStyleSheet();
  const { urlOriginal } = pageContext;

  const { documentProps } = pageContext.exports;
  const title = documentProps?.title || baseMeta.title;
  const description = documentProps?.description || baseMeta.description;
  const keyword = (
    documentProps?.keyword?.length
      ? baseMeta.keyword.concat(documentProps.keyword)
      : baseMeta.keyword
  ).join(', ');
  const image = documentProps?.image || baseMeta.image;

  try {
    const styleTags = sheet.getStyleTags();

    return escapeInject`<!DOCTYPE html>
        <html lang="ko">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo_icon.svg" />
        <meta name="viewport" content="width=1920" />
        <meta charset="UTF-8">

        <!-- 기본 -->
        <title>${title}</title>
        <meta name="description" content="${description}">
        <meta name="keywords" content="${keyword}" />
 
        <meta name="robots" content="index,follow">
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />


        <!-- Open Graph -->
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:url" content="${import.meta.env.VITE_APP_URL}${urlOriginal}" />
        <meta property="og:type" content="website" />


        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${image}" />

        <meta name="robots" content="noarchive" />

        ${styleTags}
      </head>
        <body>
        <div id="page-view"></div>
      </body>
    </html>`;
  } finally {
    sheet.seal();
  }
}

export { passToClient };

const passToClient = ['urlPathname'];
