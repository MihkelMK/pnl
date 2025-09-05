# Use this image as the platform to build the app
FROM node:20 AS build

# The WORKDIR instruction sets the working directory for everything that will happen next
WORKDIR /app

# Install packages
RUN yarn global add pnpm

COPY package.json .
RUN pnpm i

COPY . .

RUN pnpm build


FROM node:20

WORKDIR /app

COPY --from=build /app/build /app/build
COPY --from=build /app/package.json /app/package.json

RUN npm install --omit=dev --legacy-peer-deps

CMD ["node", "build/index.js"]
