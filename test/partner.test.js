const server = require('../index');
const request = require('supertest');

describe('Business Partner Fetches Items Via REST API', () => {
    it('should return all items as JSON', async () => {
        const res = await request(server).get('/api/items');
        expect(res.body).toBeInstanceOf(Object);
    });
});