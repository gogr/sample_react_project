import createError from 'http-errors'
import path from 'path'
import cookieParser from 'cookie-parser'
import fs from 'fs'

import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'

import usersRouter from './routes/users';
import postsRouter from './routes/posts';

import App from '../src/App'

const PORT = 8080
const app = express()
// app.use('/api/users', usersRouter);
// app.use('/api/posts', postsRouter);

const router = express.Router()

const serverRenderer = (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
    if (err) {
      console.error(err)
      return res.status(500).send('An error occurred')
    }
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    )
  })
}

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use('^/$', serverRenderer);
router.use('/api/users', usersRouter);
router.use('/api/posts', postsRouter);


router.use(
  express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
)

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(404));
});

// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// tell the app to use the above rules
app.use(router)


// app.use(express.static('./build'))
app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`)
})
