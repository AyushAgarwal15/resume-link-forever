#!/usr/bin/env node

/**
 * Simple script to generate a secure JWT secret
 * Run with: node generate-jwt-secret.js
 */

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

// Generate a secure random string
const jwtSecret = crypto.randomBytes(32).toString("base64");

console.log("Generated JWT Secret:", jwtSecret);
console.log("");
console.log("Add this to your .env file:");
console.log(`JWT_SECRET="${jwtSecret}"`);

// Check if .env file exists
const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  console.log("");
  console.log("Detected .env file. You can update it manually or run:");
  console.log(`echo 'JWT_SECRET="${jwtSecret}"' >> ${envPath}`);
} else {
  console.log("");
  console.log("No .env file detected. You can create one with:");
  console.log(`echo 'JWT_SECRET="${jwtSecret}"' > ${envPath}`);
}
