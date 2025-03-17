import { VercelRequest, VercelResponse } from '@vercel/node';
import { renderPage } from 'vite-plugin-ssr/server';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const pageContext = await renderPage({ urlOriginal: req.url! });

  const { httpResponse } = pageContext;
  if (!httpResponse) {
    res.status(404).send('Page not found');
    return;
  }

  const { body, statusCode, contentType } = httpResponse;
  res.status(statusCode).setHeader('Content-Type', contentType).send(body);
}
