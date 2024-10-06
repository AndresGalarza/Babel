-- Crear base de datos (opcional)
CREATE DATABASE IF NOT EXISTS library;
USE library;

-- Crear tabla de Localización
CREATE TABLE IF NOT EXISTS location (
    location_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    room VARCHAR(50) NOT NULL,
    shelf VARCHAR(50) NOT NULL,
    bookcase VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

-- Crear tabla de Volúmenes con referencia a Localización
CREATE TABLE IF NOT EXISTS volume (
    volume_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    volume_number INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES location(location_id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Insertar localizaciones con nombres creativos para las salas
INSERT INTO location (room, shelf, bookcase, position)
VALUES 
('Aventura', 'Estante 1', 'Librero 1', 'Posición 1'),
('Misterio', 'Estante 1', 'Librero 2', 'Posición 2'),
('Fantasía', 'Estante 2', 'Librero 1', 'Posición 3'),
('Ciencia Ficción', 'Estante 2', 'Librero 3', 'Posición 4'),
('Historia', 'Estante 3', 'Librero 2', 'Posición 5');

-- Insertar volúmenes y asignar localización
INSERT INTO volume (volume_number, title, location_id)
VALUES 
(101, 'Don Quijote', 1),
(102, 'Cien Años de Soledad', 2),
(103, 'La Divina Comedia', 3),
(104, 'Don Juan Tenorio', 4),
(105, 'Crimen y Castigo', 5);

