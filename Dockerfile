FROM node:10

# Create app directory
WORKDIR /app

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

RUN yarn install

# Bundle app source
COPY .env /app/.env
COPY src /app/src
COPY tmp /app/tmp
COPY tsconfig.json /app/tsconfig.json

RUN yarn run build

EXPOSE 8000 4000

CMD [ "npm", "run", "prod" ]