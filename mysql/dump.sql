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
  `projekt_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `projekt_id` (`projekt_id`),
  CONSTRAINT `aktivitaet_fk_1` FOREIGN KEY (`projekt_id`) REFERENCES `projekt` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aktivitaet`
--

LOCK TABLES `aktivitaet` WRITE;
/*!40000 ALTER TABLE `aktivitaet` DISABLE KEYS */;
INSERT INTO `aktivitaet` VALUES (1,'2022-05-17 20:00:00','Meeting',100,1),(2,'2022-05-17 20:00:00','Use-Case',10,1),(3,'2022-05-17 20:00:00','Programmieren',200,1),(4,'2022-05-17 20:00:00','Filmen',10,2),(5,'2022-05-17 20:00:00','Rapid Miner',20,2);
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
  `arbeitsleistung` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arbeitszeitkonto`
--

LOCK TABLES `arbeitszeitkonto` WRITE;
/*!40000 ALTER TABLE `arbeitszeitkonto` DISABLE KEYS */;
INSERT INTO `arbeitszeitkonto` VALUES (1,'2022-05-17 20:00:00',10.00),(2,'2022-05-17 20:00:00',20.00),(3,'2022-05-17 20:00:00',30.00),(4,'2022-05-17 20:00:00',40.00),(5,'2022-05-17 20:00:00',50.00);
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
  `erstellt_von` varchar(100) NOT NULL,
  `arbeitszeitkonto_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `arbeitszeitkonto_id` (`arbeitszeitkonto_id`),
  CONSTRAINT `buchung_fk_1` FOREIGN KEY (`arbeitszeitkonto_id`) REFERENCES `arbeitszeitkonto` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buchung`
--

LOCK TABLES `buchung` WRITE;
/*!40000 ALTER TABLE `buchung` DISABLE KEYS */;
INSERT INTO `buchung` VALUES (1,'2022-05-17 20:00:00','Lisa Müller',1),(2,'2022-05-17 20:00:00','Max Mustermann',3),(3,'2022-05-17 20:00:00','Ralf Roller',5),(4,'2022-05-17 20:00:00','Sven Bayer',2),(5,'2022-05-17 20:00:00','Sarah Singer',4);
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
  `erstellungs_zeitpunkt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ereignis`
--

LOCK TABLES `ereignis` WRITE;
/*!40000 ALTER TABLE `ereignis` DISABLE KEYS */;
INSERT INTO `ereignis` VALUES (1,'2022-05-11 11:33:33','9999-12-31 23:33:33'),(2,'2022-05-17 20:00:00','9999-12-31 23:33:33'),(3,'2022-05-17 20:00:00','9999-12-31 23:33:33'),(4,'2022-05-17 20:00:00','9999-12-31 23:33:33'),(5,'2022-05-17 20:00:00','9999-12-31 23:33:33');
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
  `google_user_id` varchar(45) NOT NULL,
  `projektleiter` int NOT NULL,
  `arbeitszeitkonto_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `arbeitszeitkonto_id` (`arbeitszeitkonto_id`),
  CONSTRAINT `person_fk_1` FOREIGN KEY (`arbeitszeitkonto_id`) REFERENCES `Arbeitszeitkonto` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'2022-05-17 20:00:00','Lisa','Müller','lisa.müller@web.de','LisaMüller99','0',1,5),(2,'2022-05-17 20:00:00','Max','Mustermann','max.mustermann@web.de','Maxi','0',0,1),(3,'2022-05-17 20:00:00','Sven','Bayer','sven.bayer@web.de','Sven1893','0',1,4),(4,'2022-05-17 20:00:00','Lisa','Singer','lisa.singer@web.de','Lischen','0',0,2),(5,'2022-05-17 20:00:00','Ralf','Roller','ralf.roller@web.de','ralle44','ß',0,3);
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt`
--

LOCK TABLES `projekt` WRITE;
/*!40000 ALTER TABLE `projekt` DISABLE KEYS */;
INSERT INTO `projekt` VALUES (1,'2022-05-11 11:33:33','Software-Praktikum','Thies'),(2,'2022-05-11 12:33:33','Data Scince','Meth'),(3,'2022-05-17 20:00:00','Pneumatik','Mildenberger'),(4,'2022-05-17 20:00:00','Web-Technologien','Kunz'),(5,'2022-05-17 20:00:00','Datenbanken','Lehmamn');
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
  `soll_stunden` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `projekt_id` (`projekt_id`),
  CONSTRAINT `projekt_person_fk_1` FOREIGN KEY (`person_id`) REFERENCES `Person` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `projekt_person_fk_2` FOREIGN KEY (`projekt_id`) REFERENCES `Projekt` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt_person`
--

LOCK TABLES `projekt_person` WRITE;
/*!40000 ALTER TABLE `projekt_person` DISABLE KEYS */;
INSERT INTO `projekt_person` VALUES (1,1,2,100),(2,2,1,50),(3,3,4,20),(4,4,3,200),(5,5,5,80);
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zeitintervall`
--

LOCK TABLES `zeitintervall` WRITE;
/*!40000 ALTER TABLE `zeitintervall` DISABLE KEYS */;
INSERT INTO `zeitintervall` VALUES (1,'2022-05-17 20:00:00',9.00,17.00),(2,'2022-05-17 20:00:00',8.00,18.00),(3,'2022-05-17 20:00:00',12.00,20.00),(4,'2022-05-17 20:00:00',8.00,18.00),(5,'2022-05-17 20:00:00',22.00,6.00);
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

-- Dump completed on 2022-05-17 21:12:25
