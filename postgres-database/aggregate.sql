
-- CREATE DATABASE reviewsSDC;
DROP TABLE IF EXISTS aggregates;
CREATE TABLE aggregates (
	id 					INT 			PRIMARY KEY		NOT NULL,
	product_id 	INT 			NOT NULL,
	score 			NUMERIC	(2,1),
	five 				INT,
	four 				INT,
	three 			INT,
	two 				INT,
	one 				INT,
	qty 				INT,
);


COPY aggregates(id, product_id, score, five, four, three, two, one,  qty) 
FROM '/Users/huayangzhang/Desktop/ProgrammingPractice/HackReactor/review-module/postgres-database/testInsert.csv' DELIMITER ',';
