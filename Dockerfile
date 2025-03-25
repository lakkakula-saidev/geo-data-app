# Step 1: Use official Node.js image to build the app
FROM node:18 AS build

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock if you're using yarn)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the app files into the container
COPY . .

# Step 6: build the app for dev
RUN npm run dev

# Step 7: Use Nginx to serve the built app
FROM nginx:alpine

# Step 8: Copy the build output from the build container
COPY --from=build /app/dist /usr/share/nginx/html

# Step 9: Expose port 80
EXPOSE 80

# Step 10: Run nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
