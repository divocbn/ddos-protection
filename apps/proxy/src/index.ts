import Fastify, { FastifyRequest } from 'fastify';
import rateLimit from '@fastify/rate-limit';
import fastifyProxy from '@fastify/http-proxy';
import { redis } from '@ddos-protection/redis';

const server = Fastify({
  logger: true
});

async function main() {
  // note(module): apparently generates a redis key with "fastify-rate-limit-(ip)" - so for reset the ratelimit we can delete that? 
  await server.register(rateLimit, {
    max: 10,
    timeWindow: '1 minute',
    redis: redis,
    keyGenerator: (request: FastifyRequest) => request.ip,
  });

  await server.register(fastifyProxy, {
    upstream: 'http://habbo.de',
    prefix: '/test',
  });

  server.get('/health', async () => {
    return { status: "ok" };
  });

  await server.listen({ port: 3002, host: '0.0.0.0' });
  console.log('Server is running on http://localhost:3002');
}

try {
  main();
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
