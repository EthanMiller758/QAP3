const server = require('../index');
const request = require('supertest');

describe('Customer Views Items Web Page', () => {
    it('should return a list of items', async () => {
        const res = await request(server).get('/items');
        expect(res.body).toBeInstanceOf(Object);
    });
});