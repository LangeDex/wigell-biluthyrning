USE rental;
SELECT * FROM car;
SELECT * FROM user;

USE rental;

-- Användare
INSERT INTO user (email, first_name, last_name, no_of_orders, password, phone, role, username) 
VALUES ('admin@wigell.se', 'Admin', 'Wigell', 0, '$2b$10$UOaRi5vhHnG8xehXUp2nUuwB6c0CAFrpAyvXOeVGiBGlU8qjFFPjq', '000000000', 'ROLE_ADMIN', 'admin');

INSERT INTO user (email, first_name, last_name, no_of_orders, password, phone, role, username) 
VALUES ('user@wigell.se', 'User', 'Wigell', 0, '$2b$10$6Y3PqzT4R/dEC.Q9kZGLCeli/jxrB2Cqu/v9nGr.uO5.7T5pO7Mk2', '000000000', 'ROLE_USER', 'user');

-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: rental
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `booking`
--

DROP TABLE IF EXISTS `booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booking` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `car_id` bigint NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booking`
--

LOCK TABLES `booking` WRITE;
/*!40000 ALTER TABLE `booking` DISABLE KEYS */;
INSERT INTO `booking` VALUES (1,_binary '\0',2,'2025-05-01','2025-05-07',4),(3,_binary '',6,'2025-05-01','2025-05-07',4),(4,_binary '\0',6,'2025-05-01','2025-05-07',6),(6,_binary '\0',4,'2025-05-05','2025-05-07',13),(7,_binary '',4,'2025-05-05','2025-05-07',6),(8,_binary '',4,'2025-05-25','2025-06-07',13),(9,_binary '',4,'2025-05-05','2025-06-07',13),(10,_binary '',6,'2025-05-15','2025-06-07',13);
/*!40000 ALTER TABLE `booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `car` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `booked` bit(1) NOT NULL,
  `feature1` varchar(255) DEFAULT NULL,
  `feature2` varchar(255) DEFAULT NULL,
  `feature3` varchar(255) DEFAULT NULL,
  `image` longblob,
  `model` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `type` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

-- Bilar
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Audi A4', 'A4', 'Sedan', 799, 0, 'Automat', 'Läder', 'GPS');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('BMW i3', 'i3', 'El', 699, 0, 'Automat', 'Snabbladdning', 'Apple CarPlay');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Toyota Hilux', 'Hilux', 'Pickup', 999, 0, 'Automat', 'Dragkrok', '4WD');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Volvo XC60', 'XC60', 'SUV', 899, 0, 'Automat', 'Dragkrok', 'GPS');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Volvo S60', 'S60', 'Sedan', 749, 0, 'Automat', 'Bluetooth', 'GPS');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('BMW G20', 'G20', 'Sedan', 849, 0, 'Automat', 'Läder', 'Sportläge');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Mercedes C-Class', 'C-Class', 'Sedan', 899, 0, 'Automat', 'Massage', 'GPS');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Dacia Duster', 'Duster', 'SUV', 649, 0, 'Manuell', '4WD', 'Dragkrok');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Volkswagen Tiguan', 'Tiguan', 'SUV', 849, 0, 'Automat', 'GPS', 'Bluetooth');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Toyota RAV4', 'RAV4', 'SUV', 899, 0, 'Automat', '4WD', 'GPS');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Volvo EX40', 'EX40', 'El', 899, 0, 'Automat', 'Snabbladdning', 'GPS');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Nissan Leaf', 'Leaf', 'El', 699, 0, 'Automat', 'Snabbladdning', 'Apple CarPlay');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('BMW iX', 'iX', 'El', 1099, 0, 'Automat', 'Snabbladdning', 'Massage');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Ford Ranger', 'Ranger', 'Pickup', 999, 0, 'Automat', 'Dragkrok', '4WD');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('RAM 1500', '1500', 'Pickup', 1199, 0, 'Automat', 'Dragkrok', 'V8');
INSERT INTO car (name, model, type, price, booked, feature1, feature2, feature3) VALUES ('Mitsubishi L200', 'L200', 'Pickup', 899, 0, 'Manuell', 'Dragkrok', '4WD');


LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;

-- bilar 

/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `no_of_orders` int NOT NULL,
  `password` varchar(64) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKob8kqyqqgmefl0aco34akdtpe` (`email`),
  UNIQUE KEY `UKsb8bbouer5wak8vyiiy4pf2bx` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

-- Användare
INSERT INTO user (email, first_name, last_name, no_of_orders, password, phone, role, username) 
VALUES ('admin@wigell.se', 'Admin', 'Wigell', 0, '$2b$10$UOaRi5vhHnG8xehXUp2nUuwB6c0CAFrpAyvXOeVGiBGlU8qjFFPjq', '000000000', 'ROLE_ADMIN', 'admin');

INSERT INTO user (email, first_name, last_name, no_of_orders, password, phone, role, username) 
VALUES ('user@wigell.se', 'User', 'Wigell', 0, '$2b$10$6Y3PqzT4R/dEC.Q9kZGLCeli/jxrB2Cqu/v9nGr.uO5.7T5pO7Mk2', '000000000', 'ROLE_USER', 'user');


LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'tomas.wigell@wigellkoncernen.se','Tomas','Wigell',0,'$2a$10$X5PhWSvcgkjfhoDEbdzeaunVO44FyvhLqP6amqSAS1sOY66jguvdy','073972488','ROLE_ADMIN','wigell'),(13,'jerry.wigell@cat.se','Jerry','Wigell',4,'$2a$10$S10/NU6F97rmH3GTqBclQ.gZ/.cmBeMqpkuxUTl0qdNeM3IKf7rTu','0739730926','ROLE_USER','jerry');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-22 12:20:52
