'use strict';

const superagent = require('superagent');


describe('http.js', () => {
  test('GET request should respond with a 200 status code and a body if there is no error', () => {
    return superagent.get('http://localhost:3000/')
      .then(response => {
        expect(response.status).toEqual(200);        
        expect(response.text).toContain(`<!DOCTYPE html>`);
        expect(response.text).toContain(`<title>Hello World!</title>`);        
      });
  });

  test('GET /cowsays request should respond with a 200 status code and a body if there is no error', () => {
    return superagent.get('http://localhost:3000/')
      .then(response => {
        expect(response.status).toEqual(200);        
        expect(response.text).toContain(`<!DOCTYPE html>`);
      });
  });

  test('POST request should respond with a 200 status code and a body if there is no error', () => {
    let bodyToTest = {'poodle': 'lola'};
    return superagent.post('http://localhost:3000/echo')
      .send(bodyToTest)
      .then(response => {
        expect(response.status).toEqual(200);        
        expect(response.body).toEqual(bodyToTest);
      });
  });

  test('POST should respond with a 400 if there is any error', () => {
    return superagent.post('http://localhost:3000/echo')
      .set( {'Content-Type': 'application/json'} )
      .send('{')
      .then(response => Promise.reject(response))
      .catch(error => {
        expect(error.status).toEqual(400);
      });
  });
});