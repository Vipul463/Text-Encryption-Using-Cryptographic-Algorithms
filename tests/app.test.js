const request = require('supertest');
const app = require('../app'); // Import the Express app
const { encrypt, decrypt } = require('../utils/encryption');
const {text} = require("express");
const sampleText = "Vipul Musale";

describe('Encryption & Decryption API Tests', () => {
    const sampleText = "Hello, this is a test!";
    let encryptedText;

    // Test Encryption Route
    test('POST /encrypt - should encrypt text successfully', async () => {
        const response = await request(app)
            .post('/encrypt')
            .send({ text: sampleText })
            .expect(200);

        expect(response.body).toHaveProperty('encryptedText');
        encryptedText = response.body.encryptedText;
        expect(typeof encryptedText).toBe('string');
    });

    test('POST /encrypt - should return error if no text is provided', async () => {
        const response = await request(app)
            .post('/encrypt')
            .send({})
            .expect(400);

        expect(response.body).toHaveProperty('error', 'No text provided for encryption');
    });

    // Test Decryption Route
    test('POST /decrypt - should decrypt text successfully', async () => {
        const response = await request(app)
            .post('/decrypt')
            .send({ encryptedText })
            .expect(200);

        expect(response.body).toHaveProperty('decryptedText', sampleText);
    });

    test('POST /decrypt - should return error if no encrypted text is provided', async () => {
        const response = await request(app)
            .post('/decrypt')
            .send({})
            .expect(400);

        expect(response.body).toHaveProperty('error', 'No encrypted text provided for decryption');
    });

    test('POST /decrypt - should return error for invalid encrypted text', async () => {
        const response = await request(app)
            .post('/decrypt')
            .send({ encryptedText: 'invalid_encrypted_string' })
            .expect(500);

        expect(response.body).toHaveProperty('error', 'Decryption failed');
    });
});

describe('Encryption Utility Function Tests', () => {
    test('encrypt function should return a valid encrypted string', () => {
        const encrypted = encrypt(sampleText);
        expect(typeof encrypted).toBe('string');
        expect(encrypted.includes(':')).toBe(true); // Ensures IV is included
    });

    test('decrypt function should return the original text', () => {
        const encrypted = encrypt(sampleText);
        const decrypted = decrypt(encrypted);
        expect(decrypted).toBe(sampleText);
    });

    test('decrypt function should throw error for invalid input', () => {
        expect(() => decrypt('invalid_string')).toThrow();
    });
});
