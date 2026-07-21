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

== FRONTEND ==

1. Executed *npm install @clerk/react* to get clerk ui blocks for authentication.

2. Created .env file in root and copy pasted VITE_CLERK_PUBLISHABLE_KEY

3. As it shows in the clerk's documentation, modified *src/index.jsx* and used *<ClerkProvider>* elements as parent of *<App />* element.

4. Modified *srx/App.jsx* and copy pasted the auth ui elements from clerk docs to there.

== MAIN ==

1. To handle the monolith approach at the best level, we will use Docker. Therefore, created *Dockerfile* and *.dockerignore* files in main root directory and filled it.

== BACKEND ==

1. Implemented filesystem and path in *src/index.js* to serve the static files (for frontend) in production. So, when the request comes in from the user, api urls will be handled by express routes, the rest will be handled by the frontend side (it will return index.html).

2. In *package.json*, added *"build": "rm -rf dist && cp -R src dist"* and *"start": "node src/index.js"* under *"scripts"* for the production.

== MAIN ==

1. In *render.com*, deployed the project.

== BACKEND ==

1. Normally, if the user does not visit the project on *render.com* for 15 minutes, the deployment got shut down. If the user wants to visit it again, deployment might take a couple minutes. To prevent it, we will send signals within the deployment server to 'health' endpoint so the server will stay awake. Therefore, changed 'FRONTEND_URL' in *render.com* dashboard to the exact render.com url path of the project.

2. Executed *npm i cron*.

3. Created *src/libs/cron.js* and filled it. Then registered it in *src/index.js* inside *app.listen* method. Check if the environment is production, start that cron job.

== MAIN ==

1. We will use *webhooks*. When the user registers, it should notify mongodb with notifications like "user.created", "user.updated", "user.deleted". Handle this in clerk project dashboard. Go to *Configure tab*. Then in sidebar, *Developers*>*Webhooks* and click on *Add Endpoint* button. Add the endpoint *websitename.com/api/webhooks/clerk*, which we will include in the backend, then select all of the notifications under *user*, then create it.

2. After creating the endpoint, copy the *Signing secret*. This is to resolve the identity of the sender.

3. Registered *CLERK_WEBHOOK_SIGNING_SECRET* key in *render.com*.

4. Implemented the webhook in *src/index.js*.

5. Created *src/webhooks/clerk.webhook.js* and filled it.

== BACKEND ==

1. Created *src/routes/auth.route.js* and *src/controllers/auth.controller.js*. Imported the route file in *src/index.js*.

2. To protect authenticated routes, created *src/middleware/auth.middleware.js*. Inside that, *protectRoute* function defined. *'next'* parameter will be called if the user pass the auth check, which is going to call the auth controller.

3. Executed *npm install @imagekit/nodejs*. Then created *src/lib/imagekit.js*.

4. Created *src/middlweare/upload.middleware.js*. We need a package to parse the uploaded files (multipart/form-data) so executed *npm install multer*. Express's normal body parser can't read the files. *express.json()*: only understands json; *express.urlencoded()* only understands simple text fields, not files. So without multer, *req.body* for a file upload would be just a garbage/empty. *Multer* is the translator that decodes the multipart blob into something usable. It makes *req.file* ready to use.

5. Created the message route and message controller. In controller defined *getUsersForSidebar* method to get all of the users except the self.

6. Using the middleware in each defined route is not a good practice. Use *app.use(middlewarename)* before the routes so it will be applied to all of the routes in the file.

== NOTE ==

- To use socket.io, in backend, execute *npm install socket.io*. In frontend (react), *npm install socket.io-client*.

- Socket.io is listening for events (both in backend and frontend).

- To listen for events: *socket.on()*

== BACKEND ==

1. Created *src/libs/socket.js* file. Then, changed the *app.listen* method in *src/index.js* to *server.listen* by importing the server argument from the *socket.js* file. This server now will listen both express app and socket in the same port.

== FRONTEND ==

1. Executed *npm install react-router*.

2. Modified *src/main.jsx*. Imported *BrowserRouter* and wrapped the *<App />* element with *<BrowserRouter>* element

3. Installed extension *ES7+ React/Redux/React-Native snippets*. Then created *src/pages/ChatPage.jsx* and typed *rfce*. It has automatically created the base code of the page component (like typing '!' in html and it brings the base html code).

4. 