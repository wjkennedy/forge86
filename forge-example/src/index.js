import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

// Basic resolver that simply returns context information.
resolver.define('getContext', (req) => {
  return { context: req.context };
});

// Return absolute download links for attachments on the current page
resolver.define('getAttachmentUrls', async (req) => {
  const { context } = req;
  const response = await api
    .asApp()
    .requestConfluence(route`/rest/api/content/${context.contentId}/child/attachment`);
  const data = await response.json();
  const baseUrl = context.serverBaseUrl;
  const files = {};
  for (const att of data.results ?? []) {
    if (att?._links?.download) {
      files[att.title] = `${baseUrl}${att._links.download}`;
    }
  }
  return files;
});

export const handler = resolver.getDefinitions();
