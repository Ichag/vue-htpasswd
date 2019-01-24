# htpasswd-generator
[![pipeline status](https://gitlab.hellbit.de/ichag/htpasswd-generator/badges/master/pipeline.svg)](https://gitlab.hellbit.de/ichag/htpasswd-generator/commits/master)

Provides a web application which generates htpasswd ready entries.  
The app uses hash algorithms implemented in JavaScript, so your password has not to leave your browser.
 
[bcryptjs](https://github.com/dcodeIO/bcrypt.js/) is used for [bcrypt](https://en.wikipedia.org/wiki/Bcrypt), it's the default and the recommended hashing algorithm.
However, since bcrypt is supported only in Apache 2.4+, MD5 and SHA1 are also supported via [crypto-js](https://github.com/brix/crypto-js).


## Project setup

```
git clone https://gitlab.hellbit.de/ichag/htpasswd-generator.git
```

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
