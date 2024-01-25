DROP TABLE IF EXISTS role;

CREATE TABLE role
(
  id BIGSERIAL,
  description VARCHAR(200) NOT NULL,
  CONSTRAINT role_pkey PRIMARY KEY (id)
);
