require('babel/polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || '3030',
  app: {
    title: 'Around',
    description: 'Around app.',
    meta: {
      charSet: 'utf-8',
      property: {
        'og:site_name': 'Around',
        'og:image': 'https://react-redux.herokuapp.com/logo.jpg',
        'og:locale': 'en_US',
        'og:title': 'Around',
        'og:description': 'Around description.',
      }
    }
  }
}, environment);
