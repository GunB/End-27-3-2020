# stage1 as builder
FROM node:10.19-alpine as builder

# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /portalpagos && mv ./node_modules ./portalpagos

WORKDIR /portalpagos

COPY . .

# Start the app.
CMD npm start --production

EXPOSE 3000 