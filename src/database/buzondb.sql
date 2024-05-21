-- Check and create ENUM types
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type') THEN
    CREATE TYPE user_type AS ENUM ('normal', 'admin');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'invoice_company') THEN
    CREATE TYPE invoice_company AS ENUM ('prime', 'project');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'invoice_status') THEN
    CREATE TYPE invoice_status AS ENUM ('sent', 'pending', 'paid', 'error', 'rejected');
  END IF;
END $$;

-- Create users table (IF NOT EXISTS for safety)
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  company VARCHAR(100) NOT NULL,
  CIF VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(150) NOT NULL,
  type user_type NOT NULL DEFAULT 'normal'
);

-- Create invoices table (IF NOT EXISTS for safety)
CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  invoice_number VARCHAR(50) NOT NULL,
  development VARCHAR(50) NOT NULL,
  company invoice_company NOT NULL,
  invoice_date DATE NOT NULL,
  registration_date DATE NOT NULL,
  status invoice_status NOT NULL,
  error_message VARCHAR(255),
  rejection_message VARCHAR(255),
  concept TEXT NOT NULL,
  amount FLOAT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

-- Insert 100 users
-- Insert 100 users
-- Insert 100 users
-- DO $$
-- BEGIN
--   FOR i IN 1..100 LOOP
--     INSERT INTO users (name, company, CIF, phone, email, password, type)
--     VALUES (
--       'User ' || i,
--       'Company ' || i,
--       'CIF' || lpad(i::text, 8, '0'),
--       '123-456-7890',
--       'user' || i || '@example.com',
--       'password' || i,
--       CASE
--         WHEN i % 10 = 0 THEN 'admin'::user_type
--         ELSE 'normal'::user_type
--       END
--     );
--   END LOOP;
-- END $$;

-- -- Insert 100 invoices
-- DO $$
-- BEGIN
--   FOR i IN 1..100 LOOP
--     INSERT INTO invoices (user_id, invoice_number, development, company, invoice_date, registration_date, status, error_message, rejection_message, concept, amount)
--     VALUES (
--       i,
--       'INV' || lpad(i::text, 10, '0'),
--       'Development ' || i,
--       CASE
--         WHEN i % 2 = 0 THEN 'prime'::invoice_company
--         ELSE 'project'::invoice_company
--       END,
--       current_date - (i % 30),
--       current_date,
--       CASE
--         WHEN i % 5 = 0 THEN 'error'::invoice_status
--         WHEN i % 3 = 0 THEN 'rejected'::invoice_status
--         ELSE 'sent'::invoice_status
--       END,
--       CASE
--         WHEN i % 5 = 0 THEN 'Error message for invoice ' || i
--         ELSE NULL
--       END,
--       CASE
--         WHEN i % 3 = 0 THEN 'Rejection message for invoice ' || i
--         ELSE NULL
--       END,
--       'Concept for invoice ' || i,
--       100
--     );
--   END LOOP;
-- END $$;

