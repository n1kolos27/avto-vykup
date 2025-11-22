import { describe, it, expect, beforeEach, vi } from 'vitest';
import request from 'supertest';
import express from 'express';
// Mock dependencies BEFORE importing apiRouter
vi.mock('../../src/lib/rateLimit.js', () => {
    return {
        applyRateLimiting: vi.fn((config) => {
            // Return a middleware that always calls next() (no rate limiting in tests)
            return (req, res, next) => {
                next();
            };
        }),
    };
});
vi.mock('../../src/lib/email/sender.js', () => ({
    sendEmail: vi.fn().mockResolvedValue({ success: true }),
}));
vi.mock('../../src/lib/config/index.js', () => ({
    APP_CONFIG: {
        EMAIL: 'test@example.com',
    },
    ENV: {
        NODE_ENV: 'test',
    },
    RATE_LIMIT: {
        EVALUATION: { windowMs: 60000, maxRequests: 5 },
        CONTACT: { windowMs: 60000, maxRequests: 3 },
        REVIEW: { windowMs: 60000, maxRequests: 2 },
    },
}));
vi.mock('../../src/lib/logger.js', () => ({
    logger: {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        debug: vi.fn(),
    },
}));
// Mock security middleware to avoid global rate limiting
vi.mock('../middleware/security.js', () => ({
    globalRateLimit: (req, res, next) => next(),
    nonceMiddleware: (req, res, next) => next(),
}));
// Import after mocks
import apiRouter from '../api.js';
describe('API Routes', () => {
    let app;
    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/api', apiRouter);
        // Add error handler middleware
        app.use((err, req, res, next) => {
            res.status(err.statusCode || 500).json({
                success: false,
                error: err.message || 'Internal server error',
                errors: err.errors,
            });
        });
    });
    describe('POST /api/evaluation', () => {
        it('should validate required fields', async () => {
            const response = await request(app)
                .post('/api/evaluation')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.errors).toBeDefined();
        });
        it('should accept valid evaluation form', async () => {
            const response = await request(app)
                .post('/api/evaluation')
                .send({
                name: 'Иван Иванов',
                phone: '+79991234567',
                brand: 'Toyota',
                model: 'Camry',
                year: 2020,
                mileage: 50000,
                condition: 'good',
            });
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });
    });
    describe('POST /api/contact', () => {
        it('should validate required fields', async () => {
            const response = await request(app)
                .post('/api/contact')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
            expect(response.body.errors).toBeDefined();
        });
        it('should accept valid contact form', async () => {
            const response = await request(app)
                .post('/api/contact')
                .send({
                name: 'Иван Иванов',
                phone: '+79991234567',
                email: 'test@example.com',
                message: 'Это тестовое сообщение для проверки валидации формы',
            });
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });
        it('should accept contact form without email (optional)', async () => {
            const response = await request(app)
                .post('/api/contact')
                .send({
                name: 'Иван Иванов',
                phone: '+79991234567',
                message: 'Это тестовое сообщение для проверки валидации формы',
            });
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });
    });
    describe('POST /api/review', () => {
        it('should validate required fields', async () => {
            const response = await request(app)
                .post('/api/review')
                .send({});
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
        it('should accept valid review form', async () => {
            const response = await request(app)
                .post('/api/review')
                .send({
                name: 'Иван Иванов',
                rating: 5,
                text: 'Отличный сервис, все быстро и качественно!',
            });
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        });
    });
});
