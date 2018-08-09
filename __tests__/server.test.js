import request from 'supertest';
// import sinon from 'sinon';

import api from '../server/start';

describe('Server', () => {
  it('should be able to run tests', () => {
    expect(2 + 2).toBe(4);
  });
  it('should respond to GET requests', () => {
    return request(api).get('/').expect(200);
  });
  // it('should serve static files', () => {
  //   return request(api).get('/').expect(200);
  // });
  // it('should load user data', () => {
  //   return github.getUser('vnglst')
  //   .then(data => {
  //     expect(data).toBeDefined()
  //     expect(data.entity.name).toEqual('Koen van Gilst')
  //   })
  // })
  // it('knows that 2 and 2 make 4', () => {
  //   expect(2 + 2).toBe(4);
  // });
  // it('knows that 2 and 2 make 4', () => {
  //   expect(2 + 2).toBe(4);
  // });
  // it('knows that 2 and 2 make 4', () => {
  //   expect(2 + 2).toBe(4);
  // });
});

// describe('Test the reviewSummary method', () => {
//   beforeAll(() => {
//       mongoDB.connect();
//   });
//   afterAll((done) => {
//       mongoDB.disconnect(done);
//   });
// }
