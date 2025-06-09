import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import rateLimit from '@fastify/rate-limit';
import { redis } from '@ddos-protection/redis';

const server = Fastify({
  logger: true
});

await server.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute'
});

server.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return { "test": 0 };
});

try {
  await server.listen({ port: 3002, host: '0.0.0.0' });

  console.log(await redis.get("test"));
  console.log('Server is running on http://localhost:3002');
} catch (err) {
  server.log.error(err);
  process.exit(1);
} 