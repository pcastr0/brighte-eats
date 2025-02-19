export const SQL_SCHEMA = {
  customers: `
    CREATE TABLE IF NOT EXISTS customers (
      customer_id INT PRIMARY KEY AUTO_INCREMENT,
      first_name VARCHAR(50) NOT NULL,
      last_name VARCHAR(50) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `,
  services: `
    CREATE TABLE IF NOT EXISTS services (
      service_id INT PRIMARY KEY AUTO_INCREMENT,
      service_name VARCHAR(50) NOT NULL UNIQUE,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `,
  customerInterests: `
    CREATE TABLE IF NOT EXISTS customer_interests (
      interest_id INT PRIMARY KEY AUTO_INCREMENT,
      customer_id INT NOT NULL,
      service_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
      FOREIGN KEY (service_id) REFERENCES services(service_id),
      UNIQUE KEY unique_customer_service (customer_id, service_id)
    )
  `,
  customerInterestSummary: `
    CREATE OR REPLACE VIEW customer_interest_summary AS
    SELECT 
      c.customer_id,
      c.first_name,
      c.last_name,
      c.email,
      c.phone,
      GROUP_CONCAT(s.service_name) as interested_services,
      c.created_at as registration_date
    FROM customers c
    JOIN customer_interests ci ON c.customer_id = ci.customer_id
    JOIN services s ON ci.service_id = s.service_id
    GROUP BY c.customer_id
  `
};
