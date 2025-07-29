import type {AppLoadContext, EntryContext} from '@shopify/remix-oxygen';
import {RemixServer} from '@remix-run/react';
import isbot from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import {createContentSecurityPolicy} from '@shopify/hydrogen';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  context: AppLoadContext,
) {
  const {nonce, header, NonceProvider} = createContentSecurityPolicy({
    shop: {
      checkoutDomain: context.env.PUBLIC_CHECKOUT_DOMAIN,
      storeDomain: context.env.PUBLIC_STORE_DOMAIN,
    },
    scriptSrc: [
      "'self'",
      'https://cdn.shopify.com',
      'https://shopify.com',
      'https://www.google-analytics.com',
      'https://www.googletagmanager.com',
      'https://cdn-cookieyes.com', // Allow cookieyes scripts
      'https://cdn-cookieyes.com/client_data/*', // Allow cookieyes client data
      '*.firebasedatabase.app/',
      ...(process.env.NODE_ENV !== 'production'
        ? ["'unsafe-eval'", 'http://localhost:*']
        : []),
    ],
    connectSrc: [
      "'self'",
      '*.firebasedatabase.app',
      '*.firebaseio.com',
      'wss://*.firebasedatabase.app',
      'https://region1.google-analytics.com',
      'https://cdn-cookieyes.com', // Allow cookieyes connections
      'https://log.cookieyes.com', // Allow cookieyes logging
      'https://monorail-edge.shopifysvc.com',
      'https://supple-wear-4923c5a88e38c270f935.o2.myshopify.dev',
      'https://lautus-stationery.myshopify.com',
      ...(process.env.NODE_ENV !== 'production' ? ['ws://localhost:*'] : []),
    ],
    styleSrc: [
      "'self'",
      'https://fonts.googleapis.com',
      "'unsafe-inline'", // Only add this if you have inline styles
    ],
    fontSrc: [
      "'self'",
      'https://fonts.gstatic.com', // Allow fonts from Google Fonts
    ],
    imgSrc: [
      "'self'", // Allow images from your own domain
      'https://cdn.shopify.com', // Allow images from Shopify's CDN
      'https://cdn-cookieyes.com', // Allow images from cookieyes
      'data:', // Allow data URIs for inline images
    ],
  });

  const body = await renderToReadableStream(
    <NonceProvider>
      <RemixServer context={remixContext} url={request.url} />
    </NonceProvider>,
    {
      nonce,
      signal: request.signal,
      onError(error) {
        // eslint-disable-next-line no-console
        console.error(error);
        responseStatusCode = 500;
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html');
  responseHeaders.set('Content-Security-Policy', header);
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
