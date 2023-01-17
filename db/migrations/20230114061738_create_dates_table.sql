-- migrate:up
CREATE TABLE date (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(100) NOT NULL,
    location TEXT NOT NULL,
    user_id INT NOT NULL,
    opentime TIME,
    clodetime TIME,
    desciption TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE category (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(50)
);

CREATE TABLE date_category (
    id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date_id INT NOT NULL,
    category_id INT NOT NULL
);

CREATE TABLE img (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    date_id INT NOT NULL,
    img_url TEXT NOT NULL
);

-- migrate:down
DROP TABLE date
DROP TABLE category
DROP TABLE date_category