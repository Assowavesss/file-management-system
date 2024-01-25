DROP TABLE IF EXISTS document;

CREATE TABLE document
(
  id BIGSERIAL,
  account_id BIGINT,
  deposit_id BIGINT,
  url VARCHAR(300) NOT NULL,
  upload_date DATE NOT NULL,
  CONSTRAINT document_pkey PRIMARY KEY (id),
  CONSTRAINT document_account_fkey FOREIGN KEY (account_id)
  REFERENCES account (id),
  CONSTRAINT document_deposit_fkey FOREIGN KEY (deposit_id)
  REFERENCES deposit (id),
  CONSTRAINT document_url_key UNIQUE (url)
);
