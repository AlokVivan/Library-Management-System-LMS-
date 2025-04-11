-- Admin user
INSERT INTO users (name, email, password, role, book_limit)
VALUES (
  'Alok',
  'alokankit9@gmail.com',
  '$2a$10$2TgWdRMZ5s6EAvZmzO3Y8e1tKXjW4XyhwOqXbgP2OyAaCMj4UktnK', -- hashed password for: password123
  'admin',
  5
);
