# FROM node as build
FROM node as build

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/


RUN npm install -location=global npm@latest

RUN npm install

RUN npx prisma generate --schema=/usr/src/app/prisma/schema.prisma

COPY . .
RUN ls -la
RUN npm run build




# Build step for development
FROM node as development

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -location=global npm@latest

RUN npm install --omit=dev

COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/Injected.js /usr/src/app/node_modules/whatsapp-web.js/src/util/Injected.js
COPY --from=build /usr/src/app/package*.json  /usr/src/app/
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/prisma /usr/src/app/prisma

COPY .env*  /usr/src/app/dist/
COPY .env*  /usr/src/app/

RUN ls -la /usr/src/app/dist/
RUN ls -la /usr/src/app/

RUN npx prisma generate --schema=/usr/src/app/prisma/schema.prisma

EXPOSE 8302

CMD ["npm", "run", "start:migrate:dev"]


# Build step for production
FROM node as production

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install -location=global npm@latest

RUN npm install --omit=dev

COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --from=build /usr/src/app/package*.json  /usr/src/app/
COPY --from=build /usr/src/app/dist /usr/src/app/dist
COPY --from=build /usr/src/app/prisma /usr/src/app/prisma

COPY .env*  /usr/src/app/dist/
COPY .env*  /usr/src/app/

RUN ls -la /usr/src/app/dist/
RUN ls -la /usr/src/app/

RUN npx prisma generate --schema=/usr/src/app/prisma/schema.prisma
RUN npx prisma db push --accept-data-loss
# RUN npx prisma migrate deploy

EXPOSE 8302

CMD ["npm", "run", "start"]
