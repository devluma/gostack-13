#!/bin/bash

docker run -d --restart=unless-stopped --name mongodb -e MONGODB_USERNAME=root -e MONGODB_PASSWORD=secret -e MONGODB_DATABASE=gostack14 -p 27017:27017 bitnami/mongodb:latest