const request = require('supertest');
const data = require('../db/data')
const app = require('../app')
const seed = require('../db/seed')

afterAll(() => db.end());

beforeEach(() => seed(data));

