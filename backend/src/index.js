// const express = require('express');
import express from "express";
import "dotenv/config";

console.log("DB_URL=", process.env.DB_URL);

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})