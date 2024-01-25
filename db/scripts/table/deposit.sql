DROP TABLE IF EXISTS deposit;

CREATE TABLE deposit
(
  id BIGSERIAL,
  account_id BIGINT,
  description TEXT NOT NULL,
  begin_date DATE NOT NULL,
  end_date DATE NOT NULL,
  CONSTRAINT deposit_pkey PRIMARY KEY (id),
  CONSTRAINT deposit_account_fkey FOREIGN KEY (account_id)
  REFERENCES account (id)
);
