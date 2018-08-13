DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

USE reviews;

CREATE TABLE users (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(250),
img VARCHAR(250)
);

CREATE TABLE reviews (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
date INT(1),
user_id INT,
product_id INT,
rating INT(1),
title VARCHAR(22),
verified BOOL,
review VARCHAR(220),
helpful INT(1),
not_helpful INT(1),
abuse INT(1),
FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE aggregates (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_id VARCHAR(20),
score DECIMAL(2,1),
qty INT(2),
five INT(2),
four INT(2),
three INT(2),
two INT(2),
one INT(2)
);

CREATE TABLE images (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
review_id INT NOT NULL,
title VARCHAR(250),
url VARCHAR(250),
FOREIGN KEY (review_id) REFERENCES reviews(id)
);
