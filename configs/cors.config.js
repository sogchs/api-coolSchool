// const createError = require('http-errors');
// const cors = require('cors');

// const allowedOrigins = process.env.CORS_URLS ? process.env.CORS_URLS.split(',') : ['http://localhost:3000']

// module.exports = cors({
//   origin: (origin, next) => {
//     const allowed = !origin || allowedOrigins.indexOf(origin) !== -1;
//     if (allowed) {
//       next(null, allowed);
//     } else {
//       next(createError(401, 'Not allowed by CORS'));
//     }
//   },
//   credentials: true
// });

const cors = require('cors')
const createError = require('http-errors');

const allowedOrigins = [process.env.CORS_URLS,'http://localhost:3000']
module.exports = cors({
  origin: (origin, next) => {
    console.log("Moi-origin: ", origin)
    const isAllowed = !origin || allowedOrigins.some(o => o === origin);
    if(isAllowed) {
      next(null,isAllowed);
    } else {
      next(createError(401, "Not allowed by CORS"))
    }
  },
  credentials: true
})