-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) CHECK (role IN ('admin', 'student')) DEFAULT 'student',
  book_limit INTEGER DEFAULT 2
);

-- Books Table
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200),
  author VARCHAR(100),
  upc VARCHAR(100) UNIQUE NOT NULL,
  location VARCHAR(100),
  available BOOLEAN DEFAULT TRUE
);

-- Issued Books
CREATE TABLE issued_books (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  book_id INTEGER REFERENCES books(id),
  issue_date DATE DEFAULT CURRENT_DATE,
  return_date DATE
);
