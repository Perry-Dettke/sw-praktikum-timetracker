-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: timetracker
-- ------------------------------------------------------
-- Server version	8.0.28

DROP DATABASE IF EXISTS timetracker;
CREATE DATABASE timetracker;

USE timetracker;


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
-- Table structure for table `aktivitaet`
--

DROP TABLE IF EXISTS `aktivitaet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aktivitaet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` datetime NOT NULL,
  `bezeichnung` varchar(100) NOT NULL,
  `kapazitaet` float NOT NULL,
  `projekt_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aktivitaet`
--

LOCK TABLES `aktivitaet` WRITE;
/*!40000 ALTER TABLE `aktivitaet` DISABLE KEYS */;
INSERT INTO `aktivitaet` VALUES (1,'2022-06-01 13:16:06','Lernen',10,0),(2,'2022-06-01 19:02:08','testtt',22,222),(3,'2022-05-17 20:00:00','Programmieren',200,1),(4,'2022-05-17 20:00:00','Filmen',10,2),(5,'2022-05-17 20:00:00','Rapid Miner',20,2);
/*!40000 ALTER TABLE `aktivitaet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arbeitszeitkonto`
--

DROP TABLE IF EXISTS `arbeitszeitkonto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arbeitszeitkonto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` datetime NOT NULL,
  `gesamtstunden` float DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arbeitszeitkonto`
--

LOCK TABLES `arbeitszeitkonto` WRITE;
/*!40000 ALTER TABLE `arbeitszeitkonto` DISABLE KEYS */;
INSERT INTO `arbeitszeitkonto` VALUES (1,'2022-06-01 17:43:54',100),(2,'2022-05-17 20:00:00',200),(3,'2022-05-17 20:00:00',300),(4,'2022-05-17 20:00:00',400),(5,'2022-05-17 20:00:00',NULL);
/*!40000 ALTER TABLE `arbeitszeitkonto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buchung`
--

DROP TABLE IF EXISTS `buchung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buchung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` datetime NOT NULL,
  `datum` date NOT NULL,
  `stunden` float NOT NULL,
  `ereignisbuchung` tinyint DEFAULT NULL,
  `person_id` int DEFAULT NULL,
  `aktivitaet_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buchung`
--

LOCK TABLES `buchung` WRITE;
/*!40000 ALTER TABLE `buchung` DISABLE KEYS */;
INSERT INTO `buchung` VALUES (1,'2022-06-02 16:46:39','2022-06-02',10,1,1,1),(2,'2022-06-02 17:46:39','2022-06-02',5,0,2,1),(3,'2022-06-02 16:46:39','2022-06-02',3,0,2,2),(4,'2022-06-02 16:46:39','2022-06-02',2,1,3,3),(5,'2022-06-02 16:46:39','2022-06-02',1,1,1,2),(6,'2022-06-02 16:46:39','2022-06-02',5,1,4,1),(7,'2022-06-02 16:46:39','2022-06-02',10,1,1,3);
/*!40000 ALTER TABLE `buchung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ereignis`
--

DROP TABLE IF EXISTS `ereignis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ereignis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` datetime NOT NULL,
  `erstellungs_zeitpunkt` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ereignis`
--

LOCK TABLES `ereignis` WRITE;
/*!40000 ALTER TABLE `ereignis` DISABLE KEYS */;
INSERT INTO `ereignis` VALUES (1,'2022-06-02 17:17:06','string'),(2,'2022-06-02 17:17:15','string'),(3,'2022-06-02 17:17:15','string'),(4,'2022-06-02 17:17:16','string'),(5,'2022-06-02 17:17:17','string');
/*!40000 ALTER TABLE `ereignis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `person`
--

DROP TABLE IF EXISTS `person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` datetime NOT NULL,
  `vor_name` varchar(45) NOT NULL,
  `nach_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `benutzer_name` varchar(45) NOT NULL,
  `google_user_id` varchar(45) DEFAULT NULL,
  `arbeitszeitkonto_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'2022-06-02 10:54:32','Lisaaa','Mülleraa','MüllerMailaa','müüllleeeraa','dwqjnw8931u489',1),(2,'2022-06-02 20:59:36','Joshua','Bayer','Mail@mail.de','YOungJosh','2184u1hjbdwq',2),(3,'2022-05-17 20:00:00','Lisa','Singer','lisa.singer@web.de','Lischen','daaad221sh732814',3),(4,'2022-05-17 20:00:00','Ralf','Roller','ralf.roller@web.de','ralle44','diuh128231',4),(5,'2022-06-01 22:14:26','Peter','Panne','ppmail','pppi','kwuqie8714',NULL);
/*!40000 ALTER TABLE `person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projekt`
--

DROP TABLE IF EXISTS `projekt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projekt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` datetime NOT NULL,
  `bezeichnung` varchar(45) NOT NULL,
  `auftraggeber` varchar(45) NOT NULL,
  `projektersteller_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt`
--

LOCK TABLES `projekt` WRITE;
/*!40000 ALTER TABLE `projekt` DISABLE KEYS */;
INSERT INTO `projekt` VALUES (1,'2022-05-11 11:33:33','Software-Praktikum','Thies',1),(2,'2022-06-01 18:56:42','string','string',1),(3,'2022-05-17 20:00:00','Pneumatik','Mildenberger',1),(4,'2022-05-17 20:00:00','Web-Technologien','Kunz',2),(5,'2022-05-17 20:00:00','Datenbanken','Lehmamn',2);
/*!40000 ALTER TABLE `projekt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projekt_person`
--

DROP TABLE IF EXISTS `projekt_person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projekt_person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `person_id` int NOT NULL,
  `projekt_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt_person`
--

LOCK TABLES `projekt_person` WRITE;
/*!40000 ALTER TABLE `projekt_person` DISABLE KEYS */;
INSERT INTO `projekt_person` VALUES (2,2,1),(3,3,4),(4,4,3),(5,5,5);
/*!40000 ALTER TABLE `projekt_person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zeitintervall`
--

DROP TABLE IF EXISTS `zeitintervall`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zeitintervall` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` datetime NOT NULL,
  `start` decimal(4,2) NOT NULL,
  `ende` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zeitintervall`
--

LOCK TABLES `zeitintervall` WRITE;
/*!40000 ALTER TABLE `zeitintervall` DISABLE KEYS */;
INSERT INTO `zeitintervall` VALUES (1,'2022-05-17 20:00:00',9.00,17.00),(2,'2022-06-01 19:00:15',2.00,4.00),(3,'2022-05-17 20:00:00',12.00,20.00),(4,'2022-05-17 20:00:00',8.00,18.00),(5,'2022-05-17 20:00:00',22.00,6.00);
/*!40000 ALTER TABLE `zeitintervall` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-04 12:00:18
