-- Inserción de datos de prueba en la tabla `users`
INSERT INTO users (name, company, CIF, phone, email, type)
VALUES
('Alice', 'Company A', 'A12345678', '123456789', 'alice@example.com', 'normal'),
('Bob', 'Company B', 'B87654321', '987654321', 'bob@example.com', 'normal'),
('Charlie', 'Company C', 'C11223344', '112233445', 'charlie@example.com', 'admin');

-- Inserción de datos de prueba en la tabla `invoices`
INSERT INTO invoices (user_id, invoice_number, development, company, invoice_date, registration_date, status, error_message, rejection_message, concept, amount)
VALUES
(1, 'INV-0001', 'Dev1', 'prime', '2024-01-01', '2024-01-02', 'sent', '', '', 'Concept 1', 100.0),
(2, 'INV-0002', 'Dev2', 'project', '2024-01-05', '2024-01-06', 'pending', '', '', 'Concept 2', 200.0),
(1, 'INV-0003', 'Dev1', 'prime', '2024-01-10', '2024-01-11', 'paid', '', '', 'Concept 3', 150.0),
(3, 'INV-0004', 'Dev3', 'project', '2024-01-15', '2024-01-16', 'error', 'Error message example', '', 'Concept 4', 250.0);
