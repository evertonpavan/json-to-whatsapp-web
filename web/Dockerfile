FROM node as build

WORKDIR /build
ENV PATH /build/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install -location=global npm@latest
RUN npm install --force

RUN npm ci --force

COPY . .

RUN npm run build

# production env
FROM nginx
RUN rm -rf /etc/nginx/conf.d
COPY --from=build build/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod 755 -R /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]