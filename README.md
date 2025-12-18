<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->

# About App

## About authentication using AUTH.JS

1. The auth.js at the root of the directory contains the functions/functionalities provided by Auth JS lib
2. the functions used are signin, signout, handlers(for handling http requests such as GET and POST), and auth(contains session information/metadata such as username)
3. The auth, signIn, signOut functions are added as the action to be performed on login page in the the sepcific (personally created {learned abot in another video}) file `lib/actions/auth.js`
4. The handlers function is used in `app\api\auth\[...nextauth]\route.js` file
5. The route.js file handles all the requests to /api/auth/* (meaning all the requests for authentications)
6. The repo contains client side logs as well (for debugging), hence not suitable for production.
Note:  The [...nextauth] part is a dynamic API route. In Next.js, square brackets ([...]) denote a catch-all route parameter
