FROM node:20.15-alpine AS base

ENV NODE_ENV build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

RUN yarn build

FROM base as prod-build

# Set the NODE_ENV to production
ENV NODE_ENV production
ENV TZ Europe/Rome

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=base /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]

