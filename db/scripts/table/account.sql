DROP TABLE IF EXISTS account;

CREATE TABLE account
(
  id BIGSERIAL,
  role_id BIGINT,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(32) NOT NULL,
  CONSTRAINT account_pkey PRIMARY KEY (id),
  CONSTRAINT account_role_fkey FOREIGN KEY (role_id)
  REFERENCES role (id),
  CONSTRAINT account_email_key UNIQUE (email)
);
