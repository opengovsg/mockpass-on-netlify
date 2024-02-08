# MockPass on Netlify

A repository to deploy MockPass on Netlify, using Netlify Functions

## How it works

Files of interest are `api/index.js`, `package.json` and `netlify.toml`

### `api/index.js`

Acts as an adaptor for MockPass' ExpressJS into a Netlify Funciton, using
[serverless-http](https://www.npmjs.com/package/serverless-http)

### `package.json`

Contains a `build` run script that zips the contents of the repo into an
archive named `serverless.zip`, placing it at `/netlify/functions`. Netlify
then treats the entire archive as a single function[^1]. This is needed, as 
Netlify's build process does not bundle files that are not referenced by `require()`
(eg. those read through `fs.readFileSync()`), nor does it properly handle `__dirname`[^2].

### `netlify.toml`

Configures Netlify with the following:
- environment variables to `SHOW_LOGIN_PAGE`, `ENCRYPT_MYINFO` and run Mockpass in stateless
  mode using `MOCKPASS_STATELESS`, to account for the stateless nature of Netlify Functions
- specify `npm run build` as the build command
- routes all requests to `/.netlify/functions/api`, including any trailing paths and parameters


[^1]: https://docs.netlify.com/functions/deploy/?fn-language=js#custom-build-2
[^2]: https://answers.netlify.com/t/enonet-no-such-file-error-when-want-to-read-a-file/21789/4
