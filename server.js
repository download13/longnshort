const koa = require('koa');
const validator = require('validator');
const db = require('./db');


const router = require('koa-router')();

const app = koa();

app.use(require('koa-static')('public'));

router.get('/new/*', function *(next) {
  const long = this.path.substr(5);
  
  if(validator.isURL(long, {protocols: ['http', 'https']})) {
    const number = yield db.addUrl(long);
  
    const short = 'https://longnshort-download13.c9users.io/' + number;
    
    this.body = {long, short};
  } else {
    this.status = 400;
    this.body = {error: 'Invalid URL'};
  }
});

router.get('/:number', function *(next) {
  const number = this.params.number;
  
  const url = yield db.findUrl(number);
  
  if(url) {
    this.response.redirect(url);
  } else {
    this.status = 404;
    this.body = {error: 'No such url'};
  }
});

app.use(router.routes());

app.listen(process.env.PORT, () => console.log('Listening'));