# Commands for Quick Docker Servers

## MySQL

```sh
# CRITICAL TODO: CHANGE PASSWORD!!!
docker run -d -p 3306:3306 --name mysql-$USER -e MYSQL_DATABASE=db-$USER -e MYSQL_ROOT_HOST='172.*.*.*' -e MYSQL_ROOT_PASSWORD='p@ssw0rd' mysql/mysql-server:5.7
```


## MongoDB

#### Keep data in container volume

```sh
docker run --name mongodb -p 127.0.0.1:27017:27017 -d mongo:latest bash -c 'mongod --logappend --storageEngine=wiredTiger'
```

#### Keep data in 'mounted volume/path' at `$HOME/mongodb`

```sh
mkdir -p $HOME/mongodb/data
docker run -v $HOME/mongodb:/data --name mongodb -p 27017:27017 -d mongo:latest bash -c 'mongod --logpath /data/mongodb.log --logappend --dbpath /data/data --storageEngine=wiredTiger'
```

### Postgres



### ElasticSearch






### Misc: Password Generator

```sh
pwgen -N 1 -s 20
```
