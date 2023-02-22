# Router/Navigation Setup
## Links
1. https://reactrouter.com/en/main/start/overview#client-side-routing


# Webpack Configuration
## Links
1. https://www.educative.io/answers/how-to-create-a-react-application-with-webpack
2. 

# Webpack CLI
## Links
1. https://webpack.js.org/ : Normal Tinkering


# Server Side Rendering
## Links
1. https://loadable-components.com/docs/server-side-rendering/
2. https://loadable-components.com/docs/getting-started/

# SSR server setup
## Links
1. https://www.digitalocean.com/community/tutorials/react-server-side-rendering
2. https://v5.reactrouter.com/web/api/StaticRouter

# SSR server CSS/SCSS setup
1. https://stackoverflow.com/questions/56318103/webpack-config-for-ssr-scss
2. https://webpack.js.org/plugins/mini-css-extract-plugin/
3. https://dev.to/deepanjangh/setting-up-css-and-sass-with-webpack-3cg#:~:text=Sass%20configuration%20for%20production%20environment&text=look%20like%20this.-,const%20path%20%3D%20require('path')%3B%20const%20MiniCssExtractPlugin%20%3D,%5B%20%7B%20test%3A%20%2F%5C.

# Code Splitting
## Links
1. https://webpack.js.org/guides/code-splitting/
2. https://www.codemzy.com/blog/how-to-name-webpack-chunk

# Redux Setup
## Links
1. https://javascript.plainenglish.io/how-to-set-up-redux-thunk-on-a-react-project-79b0c29c96db
2. https://react-redux.js.org/tutorials/quick-start
3. https://redux.js.org/introduction/getting-started
4. https://github.com/reduxjs/redux-thunk

# SSR Redux Setup
## Links
1. https://redux.js.org/usage/server-rendering

## SSR - server flow -> 
1. Create fresh Instance of store
2. Pre Data fetching based on route(eg. /home) using this store. 
3. this data is stored on this store instance.
4. get this data from store for that route and add to window object using script tag
   namely : `<script> window.PRELOADED_STATE = store.getState() </script>`
5. get this data on the client side and store this data as: 
   const preloadedState = window.PRELOADED_STATE;
6. delete window.PRELOADED_STATE
7. create store with this preloadedState as initialState


# DEV BUILD
## Client Build : npm run dev:build-client
## Server Build : npm run dev:build-server
## Server Start: npm run dev:start

# PROD BUILD
## Client Build : npm run prod:build-client
## Server Build : npm run prod:build-server
## Server Start: npm run prod:start

