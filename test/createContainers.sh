#!/bin/bash
for i in {1..5}
do
    CONTAINER_NAME=$(openssl rand -base64 12)
    echo "Creating container: $CONTAINER_NAME"
    docker run --name $CONTAINER_NAME -d -t alpine /bin/sh
