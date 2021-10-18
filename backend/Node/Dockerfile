FROM node:latest

# Create app directory
WORKDIR /usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json and package-lock.json are copied
# where availble (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# create ./dist folder where js will be
RUN npm run build

# copy .env over into ./dist folder
COPY .env ./dist/
WORKDIR ./dist


EXPOSE 4000
CMD node src/index.js