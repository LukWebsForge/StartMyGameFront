# StartMyGame Front

This is an example frontend for the [StartMyGame](https://github.com/LukWebsForge/StartMyGame) service.

At the moment all every text is hard coded in Germany, 
but maybe we can implement a translation system.

To test this frontend, I've created a [mock](https://github.com/LukWebsForge/StartMyGameMock) of the SMG software.

## Libraries

* [Typescript](https://www.typescriptlang.org/)
* [Vue.js](https://vuejs.org/v2/guide/)
* [NES.css](https://github.com/nostalgic-css/NES.css)
* [Webpack](https://webpack.js.org/)

## Install on Nginx

1. Create `/dist/` directory with production-ready assets by running `yarn run build`
2. Copy the content of the `/dist/` directory to your server
3. Copy the nginx configuration `/nginx/start-my-game.conf` to your server
4. Edit the nginx configuration
5. Restart nginx using `sudo systemctl restart nginx`

## Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn run serve
```

#### Compiles and minifies for production
```
yarn run build
```

#### Run your tests
```
yarn run test
```

#### Lints and fixes files
```
yarn run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
