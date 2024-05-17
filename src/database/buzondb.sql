-- Comprueba y crea tipos ENUM en PostgreSQL solo si no existen
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

-- Estructura de tabla para la tabla `users`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  company VARCHAR(50) NOT NULL,
  CIF VARCHAR(20) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(50) NOT NULL,
  type user_type NOT NULL DEFAULT 'normal'
);

-- Estructura de tabla para la tabla `invoices`
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
