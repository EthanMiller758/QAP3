const axios = require('axios');

describe('Add Item to Database', () => {
    it('should allow a staff member to add a new item to the database', async () => {
        try {
            const authToken = 'my-auth-token';

            const newItem = {
                id: '9',
                name: 'Burger',
                price: '44.99',
            };

            const response = await axios.post(
                'https://api.marthasgoodeats.com/items',
                newItem,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            expect(response.status).toBe(201);

            expect(response.data.id).toBe(newItem.id);
            expect(response.data.name).toBe(newItem.name);
            expect(response.data.price).toBe(newItem.price);
        } catch (error) {
            console.error('Error adding item:', error.message);
        }
    });
});