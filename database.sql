CREATE DATABASE admin_database;


CREATE TABLE admins (
  email varchar(255) PRIMARY KEY,
  password bytea NOT NULL,
  group_id integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT NOW(),
  updated_at timestamptz NOT NULL DEFAULT NOW(),
  UNIQUE (group_id),
  CHECK (group_id > 0 AND group_id < 100)
);

CREATE INDEX idx_admins_group_id ON admins (group_id);