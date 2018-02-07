# Commands for Quick Docker Servers

### MySQL

```sh
# CRITICAL TODO: CHANGE PASSWORD!!!
docker run -d -p 3306:3306 --name mysql-$USER -e MYSQL_DATABASE=db-$USER -e MYSQL_ROOT_HOST='172.*.*.*' -e MYSQL_ROOT_PASSWORD='p@ssw0rd' mysql/mysql-server:5.7
```


### MongoDB



### Postgres



### ElasticSearch






### Misc: Password Generator

```sh
pwgen -N 1 -s 20
```
