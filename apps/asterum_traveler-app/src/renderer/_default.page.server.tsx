import { escapeInject } from 'vite-plugin-ssr/server';
import { PageContextServer } from './types';
import metaJson from '@/assets/jsons/metaData.json';
import { Pathname } from '@/shared/interfaces/common.interface';

export { render };

async function render(pageContext: PageContextServer) {
  try {
    const { urlOriginal } = pageContext;
    const page: Pathname = (urlOriginal.split('/')[1] as Pathname) || '';

    // TODO: data fetch SSR에서 한 뒤 받아온 데이터를 메타 태그에 넣기
    // const { documentProps } = pageContext.exports;

    const title = page === '' ? metaJson['base'].title : metaJson[page].title;
    const description = page === '' ? metaJson['base'].description : metaJson[page].description;
    const keyword = metaJson['base'].keyword.join(', ');
    const image = page === '' ? metaJson['base'].image : metaJson[page].image;

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
 
        <meta name="robots" content="index,follow,noarchive">
        <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />


        <!-- Open Graph -->
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:image" content="${image}" />
        <meta property="og:url" content="${import.meta.env.VITE_APP_URL}${urlOriginal}" />
        <meta property="og:site_name" content="ASTERUM TRAVELER" />
        <meta property="og:type" content="website" />


        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="${title}" />
        <meta name="twitter:description" content="${description}" />
        <meta name="twitter:image" content="${image}" />
        
      </head>
        <body>
        <div id="page-view"></div>
      </body>
    </html>`;
  } catch (e) {
    console.error('SSR Rendering Error:', e);
    return {
      documentHtml: '<h1>Internal Server Error</h1>',
    };
  }
}

export { passToClient };

const passToClient = ['urlPathname'];
