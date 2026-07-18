// const express = require('express');
import express from "express";
import cors from "cors";

import fs from "fs";
import path from "path";

import "dotenv/config";

import { connectDB } from "./lib/db.js";
import { clerkMiddleware } from '@clerk/express'

const app = express();

const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

const publicDir = path.join(path.resolve(), "public");

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(clerkMiddleware())

app.get("/health", (req, res) => {
    res.status(200).json({ ok: true });
});

// If the public directory exists, serve the static files from it. This is useful for serving the frontend build in production.
// This is for the production build
if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));

    app.get('/{*splat}', (req, res, next) => {
        res.sendFile(path.join(publicDir, 'index.html'), (err) => next(err));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})