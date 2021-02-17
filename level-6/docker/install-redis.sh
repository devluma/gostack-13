#!/bin/bash

docker run -d --restart=unless-stopped --name redis -e REDIS_PASSWORD=c6069fbcdf5f8fdd506013629156542dSS -p 56379:6379 bitnami/redis:latest