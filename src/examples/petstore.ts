import { api, info, license, server } from '../openapi';

// Example
api({
  openapi: '3.0.0',
  info: info({
    version: '1.0.0',
    title: 'Swagger Petstore',
    license: license({
      name: 'MIT'
    })
  }),
  servers: [
    server({
      url: 'http://petstore.swagger.io/v1'
    })
  ],
  paths: []
});