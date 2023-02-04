CREATE DATABASE admin_database;


CREATE TABLE admin (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  group_id INTEGER NOT NULL
);