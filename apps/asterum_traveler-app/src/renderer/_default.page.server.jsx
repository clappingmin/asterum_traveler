import { escapeInject } from 'vite-plugin-ssr/server';
import { ServerStyleSheet } from 'styled-components';

export { render };

async function render(pageContext) {
  const { pageProps } = pageContext;

  const title = 'ASTERUM TRAVELER | 플레이브 팬페이지';
  const sheet = new ServerStyleSheet();

  try {
    const styleTags = sheet.getStyleTags(); // styled-components 스타일을 클라이언트로 전달

    return escapeInject`<!DOCTYPE html>
  <html lang="ko">
      <head>
        <link rel="icon" type="image/svg+xml" href="/logo_icon.svg" />
        <meta name="viewport" content="width=1920" />
        <title>테스트!! ${title}</title>
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
