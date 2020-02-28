FROM node:12-alpine

# Application code inside the image
WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# Copy source code
COPY . .

# Expose the default port used to serve the app with yarn start
EXPOSE 3000