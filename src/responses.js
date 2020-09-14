const respond = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'This is a successful response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  return respond(request, response, 200, JSON.stringify(responseObj), 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  let status = 200;
  const responseObj = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseObj.message = 'Missing valid query parameter set equal to true';
    responseObj.id = 'badRequest';
    status = 400;
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    if (responseObj.id) responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, status, responseXML, 'text/xml');
  }

  return respond(request, response, status, JSON.stringify(responseObj), 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  let status = 200;
  const responseObj = {
    message: 'This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseObj.message = 'Missing loggedIn query parameter set to yes';
    responseObj.id = 'unauthorized';
    status = 401;
  }

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    if (responseObj.id) responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, status, responseXML, 'text/xml');
  }

  return respond(request, response, status, JSON.stringify(responseObj), 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    if (responseObj.id) responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  return respond(request, response, 403, JSON.stringify(responseObj), 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    if (responseObj.id) responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  return respond(request, response, 500, JSON.stringify(responseObj), 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content. :)',
    id: 'notImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    if (responseObj.id) responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 501, responseXML, 'text/xml');
  }

  return respond(request, response, 501, JSON.stringify(responseObj), 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const responseObj = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseObj.message}</message>`;
    if (responseObj.id) responseXML = `${responseXML} <id>${responseObj.id}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 404, responseXML, 'text/xml');
  }

  return respond(request, response, 404, JSON.stringify(responseObj), 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
