    CREATE TABLE roles (
        role_id SERIAL PRIMARY KEY,
        role_name VARCHAR(50) NOT NULL,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT
    );

    CREATE TABLE categories (
        category_id SERIAL PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL ,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT
    );

    CREATE TABLE suppliers (
        supplier_id SERIAL PRIMARY KEY,
        supplier_name VARCHAR(100) NOT NULL,
        contact_person VARCHAR(100),
        contact_email VARCHAR(255),
        contact_phone VARCHAR(20),
        nit VARCHAR(50),
        razon_social VARCHAR(255),
        address VARCHAR(255),
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT
    );



    CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address VARCHAR(255),
        phone VARCHAR(20),
        role_id INT NOT NULL,
        personal_information_id INT, -- Added column
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (role_id) REFERENCES roles(role_id),
    );

    CREATE TABLE personal_information (
        personal_information_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address VARCHAR(255),
        phone VARCHAR(20),
        document VARCHAR(30),
        user_id INT UNIQUE, -- Added column with unique constraint
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) -- Added foreign key constraint
    );

    CREATE TABLE units (
        unit_id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL UNIQUE,
        abbreviation VARCHAR(10) NOT NULL UNIQUE,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
     
    CREATE TABLE products (
        product_id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT, 
        purchase_price DECIMAL(15, 7) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        stock_quantity INT NOT NULL DEFAULT 0,
        barcode VARCHAR(50), -- New column
        manufacturer VARCHAR(100),
        category_id INT NOT NULL,
        supplier_id INT,
        unit_id INT NOT NULL,
        unit_abbreviation VARCHAR(10) NOT NULL,
        image_url TEXT,
        product_code VARCHAR(50),
        weight DECIMAL(10,2), 
        discount DECIMAL(5, 2) DEFAULT 0.00,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        is_active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (category_id) REFERENCES categories(category_id),

    );

    CREATE TYPE product_price_type_enum AS ENUM ('Purchase', 'sale');

    CREATE TABLE product_prices (
        product_price_id SERIAL PRIMARY KEY,
        product_id INT NOT NULL,
        price DECIMAL(15, 7) NOT NULL,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    )

    CREATE TABLE product_images (
        image_id SERIAL PRIMARY KEY,
        product_id INT NOT NULL,
        image_url TEXT NOT NULL,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (product_id) REFERENCES products(product_id)
    );

    CREATE TYPE movement_type_enum AS ENUM ('In', 'Out');
    CREATE TABLE inventory_movements (
        movement_id SERIAL PRIMARY KEY,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        balance INT NOT NULL,
        movement_type movement_type_enum,
        movement_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        user_id INT NOT NULL,
        supplier_id INT,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (product_id) REFERENCES products(product_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id)
    );

    CREATE TABLE orders (
        order_id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        order_date DATE NOT NULL,
        total_amount DECIMAL(10, 2),
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );

    CREATE TABLE order_items (
        order_item_id SERIAL PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        price DECIMAL(15, 7) NOT NULL,
        quantity INT NOT NULL,
        subtotal DECIMAL(10, 2),
        lote  VARCHAR(50),
        expiration_date DATE,
        unit_id INT NOT NULL,
        movement_type movement_type_enum,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
        FOREIGN KEY (unit_id) REFERENCES units(unit_id)
    );
    CREATE TABLE customers (
        customer_id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        address VARCHAR(255),
        phone VARCHAR(20),
        document VARCHAR(30),
        nit VARCHAR(50),
        razon_social VARCHAR(255),
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT
    );
    CREATE TABLE payments (
        payment_id SERIAL PRIMARY KEY,
        order_id INT NOT NULL,
        payment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        amount DECIMAL(10, 2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
    );
    CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        product_id INT NOT NULL,
        user_id INT NOT NULL,
        rating INT NOT NULL,
        comment TEXT,
        active BOOLEAN DEFAULT TRUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_by INT,
        updated_by INT,
        FOREIGN KEY (product_id) REFERENCES products(product_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id)
    );



    -- Truncate tables
    TRUNCATE TABLE inventory_movements, order_items, payments, reviews, orders, customers, products, suppliers, categories, users, roles;
    -- Truncate additional tables
    TRUNCATE TABLE units, personal_information, product_prices;

    -- Reset primary key sequences
    ALTER SEQUENCE inventory_movements_movement_id_seq RESTART WITH 1;
    ALTER SEQUENCE order_items_order_item_id_seq RESTART WITH 1;
    ALTER SEQUENCE payments_payment_id_seq RESTART WITH 1;
    ALTER SEQUENCE reviews_review_id_seq RESTART WITH 1;
    ALTER SEQUENCE orders_order_id_seq RESTART WITH 1;
    ALTER SEQUENCE customers_customer_id_seq RESTART WITH 1;
    ALTER SEQUENCE products_product_id_seq RESTART WITH 1;
    ALTER SEQUENCE suppliers_supplier_id_seq RESTART WITH 1;
    ALTER SEQUENCE categories_category_id_seq RESTART WITH 1;
    ALTER SEQUENCE users_user_id_seq RESTART WITH 1;
    ALTER SEQUENCE roles_role_id_seq RESTART WITH 1;
    ALTER SEQUENCE units_unit_id_seq RESTART WITH 1;
    ALTER SEQUENCE personal_information_personal_info_id_seq RESTART WITH 1;
    ALTER SEQUENCE product_prices_product_price_id_seq RESTART WITH 1;

   

    

    
    -- Insert data into the roles table
    INSERT INTO roles (role_id, role_name)
    VALUES (1, 'Admin'),
           (2, 'User');

    -- Insert data into the categories table
    INSERT INTO categories (category_id, name, created_at, updated_at, created_by, updated_by)
    VALUES 
        (1, 'Electronics', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (2, 'Clothing', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (3, 'Books', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (4, 'Home Appliances', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (5, 'Furniture', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (6, 'Toys', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (7, 'Sports Equipment', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (8, 'Beauty', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (9, 'Jewelry', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (10, 'Automotive', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (11, 'Healthcare', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (12, 'Pet Supplies', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (13, 'Office Supplies', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (14, 'Food & Beverages', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (15, 'Home Decor', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (16, 'Garden & Outdoor', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (17, 'Baby Products', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (18, 'Musical Instruments', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (19, 'Art & Crafts', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
        (20, 'Stationery', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);

    -- Insert data into the suppliers table
    INSERT INTO suppliers (supplier_id, supplier_name, contact_person, contact_email, contact_phone, address, created_at, updated_at, created_by, updated_by)
    VALUES (1, 'Supplier 1', 'John Doe', 'supplier1@example.com', '1234567890', '123 Supplier St', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
           (2, 'Supplier 2', 'Jane Smith', 'supplier2@example.com', '9876543210', '456 Supplier St', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);

    -- Insert data into the users table
    INSERT INTO users (user_id, username, password, email, address, phone, role_id, created_at, updated_at, created_by, updated_by)
    VALUES (1, 'admin', 'admin123', 'admin@example.com', '123 Admin St', '1234567890', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
           (2, 'user1', 'user123', 'user1@example.com', '456 User St', '9876543210', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);

    -- Insert data into the products table
    INSERT INTO products (product_id, name, description, price, stock_quantity, category_id, barcode, manufacturer, supplier_id, image_url, product_code, weight, created_at, updated_at, created_by, updated_by, is_active, discount)
    VALUES 
        (1, 'iPhone 13 Pro', 'Flagship smartphone', 1099.99, 10, 1, '1234567890123', 'Apple', 1, 'https://example.com/iphone13pro.jpg', 'IP13PRO', 0.2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00),
        (2, 'Samsung Galaxy S21', 'High-end smartphone', 999.99, 15, 1, '2345678901234', 'Samsung', 2, 'https://example.com/galaxys21.jpg', 'GALS21', 0.18, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00),
        (3, 'Sony PlayStation 5', 'Next-gen gaming console', 499.99, 20, 1, '7890123456789', 'Sony', 1, 'https://example.com/ps5.jpg', 'PS5', 4.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00),
        (4, 'Nintendo Switch', 'Hybrid gaming console', 299.99, 15, 1, '0123456789012', 'Nintendo', 2, 'https://example.com/switch.jpg', 'SWITCH', 3.75, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00),
        (5, 'Dell XPS 13', 'Ultra-thin laptop', 1299.99, 10, 1, '3456789012345', 'Dell', 1, 'https://example.com/xps13.jpg', 'XPS13', 2.7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00),
        (6, 'Apple MacBook Pro', 'Powerful laptop for professionals', 1999.99, 8, 1, '5678901234567', 'Apple', 2, 'https://example.com/macbookpro.jpg', 'MBP', 3.02, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00),
        (7, 'Samsung QLED TV', 'High-quality 4K TV', 1499.99, 12, 1, '7890123456789', 'Samsung', 1, 'https://example.com/qledtv.jpg', 'QLEDTV', 25.5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00),
        (8, 'Sony WH-1000XM4', 'Wireless noise-canceling headphones', 349.99, 25, 1, '0123456789012', 'Sony', 2, 'https://example.com/wh1000xm4.jpg', 'WH1000XM4', 0.25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00),
        (9, 'Canon EOS R5', 'Full-frame mirrorless camera', 3799.99, 5, 1, '3456789012345', 'Canon', 1, 'https://example.com/eosr5.jpg', 'EOSR5', 1.63, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00),
        (10, 'GoPro HERO9 Black', 'Action camera', 449.99, 18, 1, '5678901234567', 'GoPro', 2, 'https://example.com/hero9black.jpg', 'HERO9', 0.16, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00),
        (11, 'Bose QuietComfort 35 II', 'Wireless noise-canceling headphones', 299.99, 30, 1, '7890123456789', 'Bose', 1, 'https://example.com/qc35ii.jpg', 'QC35II', 0.31, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00),
        (12, 'LG OLED TV', 'Premium OLED TV', 1999.99, 10, 1, '0123456789012', 'LG', 2, 'https://example.com/oledtv.jpg', 'OLEDTV', 20.8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1, TRUE, 0.00);
    
    
    -- Insert data into the inventory_movements table
    INSERT INTO inventory_movements (movement_id, product_id, quantity, movement_type, movement_date, user_id, supplier_id, created_at, updated_at, created_by, updated_by)
    VALUES (1, 1, 10, 'In', CURRENT_TIMESTAMP, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
           (2, 2, 5, 'Out', CURRENT_TIMESTAMP, 2, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);

    -- Insert data into the orders table
    INSERT INTO orders (order_id, user_id, order_date, total_amount, created_at, updated_at, created_by, updated_by)
    VALUES (1, 2, CURRENT_TIMESTAMP, 50.99, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
           (2, 1, CURRENT_TIMESTAMP, 100.50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);

    -- Insert data into the order_items table
    INSERT INTO order_items (order_item_id, order_id, product_id, quantity, subtotal, created_at, updated_at, created_by, updated_by)
    VALUES (1, 1, 1, 2, 21.98, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
           (2, 1, 2, 3, 59.97, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);

    -- Insert data into the customers table
    INSERT INTO customers (customer_id, first_name, last_name, email, address, phone, created_at, updated_at, created_by, updated_by)
    VALUES (1, 'John', 'Doe', 'john@example.com', '123 Customer St', '1234567890', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
           (2, 'Jane', 'Smith', 'jane@example.com', '456 Customer St', '9876543210', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);

    -- Insert data into the payments table
    INSERT INTO payments (payment_id, order_id, payment_date, amount, payment_method, created_at, updated_at, created_by, updated_by)
    VALUES (1, 1, CURRENT_TIMESTAMP, 50.99, 'Credit Card', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
           (2, 2, CURRENT_TIMESTAMP, 100.50, 'PayPal', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);

    -- Insert data into the reviews table
    INSERT INTO reviews (review_id, product_id, user_id, rating, comment, created_at, updated_at, created_by, updated_by)
    VALUES (1, 1, 2, 4, 'Great product!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1),
           (2, 2, 1, 5, 'Excellent quality!', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1, 1);


-- Set the last sequence primary key for each table

-- Table: products
SELECT setval(pg_get_serial_sequence('products', 'product_id'), (SELECT MAX(product_id) FROM products));

-- Table: inventory_movements
SELECT setval(pg_get_serial_sequence('inventory_movements', 'movement_id'), (SELECT MAX(movement_id) FROM inventory_movements));

-- Table: orders
SELECT setval(pg_get_serial_sequence('orders', 'order_id'), (SELECT MAX(order_id) FROM orders));

-- Table: order_items
SELECT setval(pg_get_serial_sequence('order_items', 'order_item_id'), (SELECT MAX(order_item_id) FROM order_items));

-- Table: customers
SELECT setval(pg_get_serial_sequence('customers', 'customer_id'), (SELECT MAX(customer_id) FROM customers));

-- Table: payments
SELECT setval(pg_get_serial_sequence('payments', 'payment_id'), (SELECT MAX(payment_id) FROM payments));

-- Table: reviews
SELECT setval(pg_get_serial_sequence('reviews', 'review_id'), (SELECT MAX(review_id) FROM reviews));

-- Table: suppliers
SELECT setval(pg_get_serial_sequence('suppliers', 'supplier_id'), (SELECT MAX(supplier_id) FROM suppliers));

-- Table: categories
SELECT setval(pg_get_serial_sequence('categories', 'category_id'), (SELECT MAX(category_id) FROM categories));

-- Table: users
SELECT setval(pg_get_serial_sequence('users', 'user_id'), (SELECT MAX(user_id) FROM users));

-- Table: roles
SELECT setval(pg_get_serial_sequence('roles', 'role_id'), (SELECT MAX(role_id) FROM roles));

-- Table: product_images
SELECT setval(pg_get_serial_sequence('product_images', 'image_id'), (SELECT MAX(image_id) FROM product_images));
