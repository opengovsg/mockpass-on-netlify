# MockPass on Netlify (or Vercel)

A repository to deploy MockPass on Netlify using Netlify Functions, 
and Vercel using Vercel Functions


## Deploy now
#### Netlify
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/demossg/mockpass-on-netlify#SHOW_LOGIN_PAGE=true&ENCRYPT_MYINFO=true&MOCKPASS_STATELESS=true)

#### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdemossg%2Fmockpass-on-netlify&env=ENCRYPT_MYINFO,SHOW_LOGIN_PAGE,MOCKPASS_STATELESS)  
**NOTE:** When prompted, set all environment variables to `true`

## How it works

Files of interest are:
- `api/index.js`
- `serverless.js`
- `package.json`
- `netlify.toml`
- `vercel.json`

### `api/index.js`

Re-exports MockPass' ExpressJS router for use by Vercel. Vercel will automatically treat
`/api` as a location for Vercel Functions, if no supported framework is detected[^1].

### `serverless.js`

Acts as an adaptor for the router exported in `api/index.js` into a Netlify Funciton, using
[serverless-http](https://www.npmjs.com/package/serverless-http).

### `package.json`

Contains a `build:netlify` run script that zips the contents of the repo into an
archive named `serverless.zip`, placing it at `/netlify/functions`. Netlify
then treats the entire archive as a single function[^2]. This is needed, as 
Netlify's build process does not bundle files that are not referenced by `require()`
(eg. those read through `fs.readFileSync()`), nor does it properly handle `__dirname`[^3].

### `netlify.toml`

Configures Netlify with the following:
- environment variables to `SHOW_LOGIN_PAGE`, `ENCRYPT_MYINFO` and run Mockpass in stateless
  mode using `MOCKPASS_STATELESS`, to account for the stateless nature of Netlify Functions
- specify `npm run build:netlify` as the build command
- rewrites all requests to go to `/.netlify/functions/serverless`, including any trailing paths and parameters

### `vercel.json`

Rewrites all requests to go to `/api`, including any trailing paths and parameters

[^1]: https://vercel.com/guides/using-express-with-vercel#standalone-express
[^2]: https://docs.netlify.com/functions/deploy/?fn-language=js#custom-build-2
[^3]: https://answers.netlify.com/t/enonet-no-such-file-error-when-want-to-read-a-file/21789/4
