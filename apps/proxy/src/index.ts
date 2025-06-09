import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import rateLimit from '@fastify/rate-limit';
import { createProxyServer } from 'http-proxy';
import { redis } from '@ddos-protection/redis';
import { env } from './env';

const server = Fastify({
  logger: true
});

// note(module): previously i wanted to use fastify's version of http-proxy, 
//               but its limited to only 1 proxy per url
const proxy = createProxyServer({ changeOrigin: true });

async function main() {
  // note(module): apparently generates a redis key with "fastify-rate-limit-(ip)" - so for reset the ratelimit we can delete that? 
  await server.register(rateLimit, {
    max: 10,
    timeWindow: '2 minutes',
    redis: redis,
    keyGenerator: (request: FastifyRequest) => request.ip,
  });

  server.get('/health', async () => {
    return { status: "ok" };
  });

  server.setErrorHandler((error: Error & { statusCode?: number }, request: FastifyRequest, reply: FastifyReply) => {
    console.log(request.ip);
    
    if (error.statusCode === 429) {
      proxy.web(request.raw, reply.raw,
        {
          target: env.CAPTCHA_URL
        },
        (err) => {
          if (err) {
            server.log.error(err);
            reply.status(502).send('Proxy error');
          }
        });
    } else {
      reply.status(500).send({
        error: 'Internal Server Error',
        message: 'An unexpected error occurred'
      });
    }
  });

  server.all('/*', async (req: FastifyRequest, reply: FastifyReply) => {
    return new Promise<void>((resolve, reject) => {
      proxy.web(req.raw, reply.raw,
        {
          target: env.ORIGIN_URL
        }, 
        (err) => {
          if (err) {
            server.log.error(err);
            reply.status(502).send('Proxy error');
            reject(err);
          } else {
            resolve();
          }
        });
    });
  });

  await server.listen({ port: 3002, host: '0.0.0.0' });
  console.log('Server is running on http://localhost:3002');
}

main().catch((err) => {
  server.log.error(err);
  process.exit(1);
});