# ##STAGE 1 :BUID ###
# FROM node:latest as build
# # RUN -p mkdir /app
# WORKDIR /app
# COPY package*.json /app/
# #ENV PATH /app/node_modules/.bin:$PATH
# RUN npm cache clean --force
# # Install the dependencies and make the folder


# #COPY ..
# RUN npm install -g @angular/cli@9
# RUN npm install
# #RUN npm install --save

# #add app
# #COPY . /app-ui
# COPY . /app

# # RUN ng build  --base-href /

# RUN npm run ng build --prod --base-href  /app/
#RUN npm run build -- --output-path=./dist --prod

### STAGE 2 : SETUP ###
FROM nginx:latest
RUN apt-get update && apt-get -qq install vim && apt-get -qq install net-tools
COPY nginx.conf /etc/nginx/nginx.conf

# COPY nginx/default.conf /etc/nginx/conf.d/
## Remove default nginx index page
# RUN rm -rf /usr/share/nginx/html/*

#COPY --from=build /app/dist /usr/share/nginx/html
COPY /dist /usr/share/nginx/html
EXPOSE 8080 4200
CMD ["nginx","-g","daemon off;"]





# FROM nginx:latest
# COPY /dist /usr/share/nginx/html