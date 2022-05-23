FROM node:18.2.0
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./