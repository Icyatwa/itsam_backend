# the iamge to base on while creating the image 
FROM node:20-alpine

#exposing the port
EXPOSE 5000

# setting the weorking directory 
WORKDIR /usr/src

#copying the source files
COPY . ./

# running the node initialization
RUN npm init -y

# runnning the node install for packages in package json 
RUN npm install

# starting the server for the backend 
ENTRYPOINT [ "node" , "server.js" ]
