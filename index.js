import keys from './key.json' assert { type: 'json' };

export default {
  async fetch(request) {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    try {
      const { key } = await request.json();

      if (!key || typeof key !== 'string') {
        return new Response('false');
      }

      if (keys.hasOwnProperty(key)) {
        return new Response('true');
      } else {
        return new Response('false');
      }
    } catch (err) {
      return new Response('false', { status: 400 });
    }
  }
};
