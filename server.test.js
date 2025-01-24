const request = require('supertest');
const express = require('express');

const app = require('./server');

describe('GET /ping', () => {
  it('should respond with "pong"', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toBe(200); 
    expect(response.text).toBe('pong'); 
  });
});

