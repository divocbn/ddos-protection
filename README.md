# ddos-protection

A easy to use DDoS protection system that combines a Next.js CAPTCHA service with a Fastify proxy server. 

The solution implements rate limiting and CAPTCHA verification to protect your applications from automated attacks while maintaining a smooth user experience.

## How to setup

```sh
pnpm i
npm i
```

You'll need to set up environment variables for both the captcha and proxy applications. Clone and edit the following files:

- `apps/captcha/.env.example`
- `apps/proxy/.env.example`

### Tech Stack

- [Next.js](https://nextjs.org/) for serving the captcha page
- [Fastify](https://fastify.dev) for proxy
- [Sharp](https://github.com/lovell/sharp) for image generation
- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
