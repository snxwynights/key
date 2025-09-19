import keys from './key.json' assert { type: 'json' };

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (request.method === 'GET' && url.pathname === '/') {
      const html = await fetch(new URL('./browser.html', import.meta.url))
        .then(res => res.text());
      return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
      });
    }

    if (request.method === 'POST') {
      try {
        const { key } = await request.json();
        if (!key || typeof key !== 'string') {
          return new Response('false');
        }
        return new Response(keys.hasOwnProperty(key) ? 'true' : 'false');
      } catch {
        return new Response('false', { status: 400 });
      }
    }

    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
