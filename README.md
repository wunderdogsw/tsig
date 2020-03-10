# Typescript interest group

## Prerequisites

1. Install yarn, docker, docker-compose. Port 3000, 5432, 8000 should be free

2. Run development environment
    1.
    ```
    docker-compose up
    ```
    If you want to run it in detached mode
    ```
    docker-compose up -d
    ```
4. Go to http://localhost:3000

## Docker
* If you have old Docker config and it doesnt work
    1. Try to rebuild docker image.
        ```
        docker-compose build
        ```

    2. And try to run it up again with
        ```
        docker-compose up
        ```

------
Still doesnt work?

* Wipe all images and containers related to this project to start again fresh (wont affect your other images and containers)
    ```
    docker-compose rm
    ```

------


* Stop all containers
```
docker-compose down
```

