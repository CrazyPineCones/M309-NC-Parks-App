const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const routes = require('./routes');
app.use(routes);

const SessionCookieMiddleware = require('./middleware/SessionCookieMiddleware');
app.use(SessionCookieMiddleware);

const PORT = 3000;
// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));