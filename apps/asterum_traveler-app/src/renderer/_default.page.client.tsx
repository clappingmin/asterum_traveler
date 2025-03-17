import ReactDOM from 'react-dom/client';
import type { PageContextClient } from './types';
import { PageShell } from './PageShell';

export { render };

async function render(pageContext: PageContextClient) {
  const { Page } = pageContext;
  if (!Page) throw new Error('Client-side render() hook expects pageContext.Page to be defined');

  const root = document.getElementById('page-view');
  if (!root) throw new Error('DOM element #react-root not found');

  // SPA
  ReactDOM.createRoot(root).render(
    <PageShell pageContext={pageContext}>
      <Page />
    </PageShell>
  );

  // SSR
  // ReactDOM.hydrateRoot(
  //   root!,
  //   <PageShell>
  //     <Page />
  //   </PageShell>
  // );
}
