CREATE DATABASE admin_database;
CREATE DATABASE users_database;
CREATE DATABASE info_database;


CREATE TABLE admins(
    email varchar(255) PRIMARY KEY,
    id int NOT NULL,
    username varchar(255) NOT NULL,
    group_id integer NOT NULL,
    UNIQUE (group_id),
    CHECK (group_id > 0 AND group_id < 100)
);


CREATE TABLE users(
    id int NOT NULL,
    username varchar(255) NOT NULL,
    PRIMARY KEY (id)
    
);


CREATE TABLE info(
    id int NOT NULL,
    fullname int NOT NULL,
    user_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (user_id) REFERENCES admins(id)
);