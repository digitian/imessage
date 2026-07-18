== SETUP ==
1. Initialized frontend with "npm create vite@latest ." command. Selected React, React Javascript + Compiler, ESLint.
2. Init backend with "npm init -y" to create *package.json*. Then executed "npm install express dotenv mongoose cors"

== BACKEND ==
1. Created *index.js* in backend main root folder. This is the main naming convention.

2. Primitive way to watch the *index.js* (main server file) in *package.json* *"scripts"* field: *"dev": "node --watch index.js"*. But here, we will use "npm install nodemon -D" and change the dev script to "nodemon index.js"

3. In *package.json*, change *"type"* from *"commonjs"* to *"module"* to be able to use the modern syntax like import express from "express"

4. To follow the main foldering pattern, create *src* folder and move *index.js* inside that folder.

5. In *src* folder, created *routes* *models* *lib* *controllers* *webhooks* folders.

6. Created *.env* file in root. Then imported *"dotenv/config"* package in index.js.

7. Used mongodb for database, clerk for authentication, imagekit.io for image uploads. Got all of the api keys into *.env*.

8. In *src/models*, created *user.model.js* and *message.model.js*.

9. Had a problem with connecting to MongoDB. Hardcoded dns setting fixed it (I found it out).

10. Executed *npm install @clerk/express* to use clerk authentication middleware. You can check the installation doc in clerk website to add the middleware easily.

11. In *index.js*, added *app.use(express.json());* to parse client side json.

12. In *index.js*, added *app.use(express.json());*. This is good for development environment, not for production. Because it allows all of the addresses to interact with the backend. Therefore, we modified it to *app.use(cors({ origin: FRONTEND_URL, credentials: true }));* and added FRONTEND_URL param to *.env* for safety. This address will be changed in production.