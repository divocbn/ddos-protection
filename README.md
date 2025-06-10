# ddos-protection

A easy to use DDoS protection system that combines a Next.js CAPTCHA service with a Fastify proxy server. 

The solution implements rate limiting and CAPTCHA verification to protect your applications from automated attacks while maintaining a smooth user experience.

## How to setup

### 1. Install Dependencies  
Run the following commands:  
```sh
pnpm install
npm install
```

### 2. Configure Environment Variables  
Set up the required environment variables for both the captcha and proxy applications.  

1. Copy the example files:  
   ```sh
   cp apps/captcha/.env.example apps/captcha/.env
   cp apps/proxy/.env.example apps/proxy/.env
   ```  
2. Edit the `.env` files with your configuration:  

   #### **Captcha Service** (`apps/captcha/.env`)  
   ```env
   REDIS_URL="redis://localhost:6379"  # Redis connection URL
   ```  

   #### **Proxy Service** (`apps/proxy/.env`)  
   ```env
   REDIS_URL="redis://localhost:6379"  # Redis connection URL
   NODE_ENV="development"              # Runtime environment  

   # Origin site to be secured and proxied  
   ORIGIN_URL="https://internal.cleverpush.de"  

   # URL of the captcha service (e.g., http://localhost:3000)  
   CAPTCHA_URL="http://captcha.cleverpush.de"  
   ```  

### Tech Stack

- [Next.js](https://nextjs.org/) for serving the captcha page
- [Fastify](https://fastify.dev) for proxy
- [Sharp](https://github.com/lovell/sharp) for image generation
- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
