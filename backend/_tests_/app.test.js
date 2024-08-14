import mongoose from 'mongoose';

import request from 'supertest';

import app from '../app';

import dotenv from 'dotenv';

dotenv.config();


beforeEach(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });


  describe('GET /', () => {
    it('should return Hello World!', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe('Hello World!');
    });
  });

  
//   test for all product

describe('GET /api/products', () => {
    it('it should return status 200 with array of products', async () => {
        const res = await request(app).get('/api/products');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body.products)).toBe(true); 
        expect(res.body.products.length).toBeGreaterThan(0);
    });
});

// test for unique /single product

describe('GET /api/product/:id', () => {
  it('should fetch a single product by ID', async () => {
      const productId = '66b7d65481b3856a50f86136'; // Replace with a valid product ID

      const response = await request(app)
          .get(`/api/product/${productId}`)
          .expect('Content-Type', /json/)
          .expect(200); 

      // Assertions to verify the response
      expect(response.body.status).toBe("success");
      expect(response.body.product).toHaveProperty('_id', productId);
      expect(response.body.product).toHaveProperty('name');
      expect(response.body.product).toHaveProperty('price');
      expect(response.body.product).toHaveProperty('description');
      expect(response.body.product).toHaveProperty('productImage');
      
     
  });
});