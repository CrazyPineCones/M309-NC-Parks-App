const crypto = require('crypto');

function generateSessionId() {
  return crypto.randomBytes(6).toString('hex');
}

const sessions = {};

const SESSION_COOKIE_NAME = 'NCParks';

function generateEmptySession() {
  return {
    visitedParks: [],
    createdAt: new Date(),
  };
}

function SessionCookieMiddleware(req, res, next) {
  const sessionId = req.cookies[SESSION_COOKIE_NAME]; 

  if (!sessionId) {
 
    let newSessionID = generateSessionId();

    
    let sessionObj = generateEmptySession(); 
    sessions[newSessionID] = sessionObj;

  
    req.session = sessionObj;

  
    res.cookie(SESSION_COOKIE_NAME, newSessionID, { 
      httpOnly: true, 
      secure: true, 
      maxAge: 2 * 60 * 1000 
    });

    
    console.log('We have a new visitor!', newSessionID, req.session);
  } else {
    
    if (sessions[sessionId]) {
      req.session = sessions[sessionId];
      console.log('Oh look,', sessionId, 'is back!', req.session);
    } else {
     
      let sessionObj = generateEmptySession();
      sessions[sessionId] = sessionObj; 
      req.session = sessionObj; 
      console.log('Session for', sessionId, 'not found. Created a new session!', req.session);
    }
  }
  
  next();
}



module.exports = SessionCookieMiddleware;