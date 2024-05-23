# Node block
FROM node:20.1.0 as nodework
WORKDIR /mantis_free_react_admin_template_main
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Nginx block
FROM nginx:1.25.3
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=nodework /mantis_free_react_admin_template_main/build .

# Update the NGINX configuration to listen on port 8080
RUN sed -i 's/listen       80;/listen       8080;/g' /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
