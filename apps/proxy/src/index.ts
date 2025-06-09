import Fastify, { FastifyRequest, FastifyReply, FastifyError, errorCodes } from 'fastify';
import rateLimit from '@fastify/rate-limit';
import fastifyProxy from '@fastify/http-proxy';
import { redis } from '@ddos-protection/redis';

const server = Fastify({
  logger: true
});

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
  http2: false
});

server.get('/health', async () => {
  return { status: "ok" };
});

try {
  await server.listen({ port: 3002, host: '0.0.0.0' });

  console.log('Server is running on http://localhost:3002');
} catch (err) {
  server.log.error(err);
  process.exit(1);
}