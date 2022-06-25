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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aktivitaet`
--

LOCK TABLES `aktivitaet` WRITE;
/*!40000 ALTER TABLE `aktivitaet` DISABLE KEYS */;
INSERT INTO `aktivitaet` VALUES (1,'2022-05-17 20:00:00','Lernen',300,1),(2,'2022-05-17 20:00:00','Pandas',20,3),(3,'2022-05-17 20:00:00','Programmieren',200,3),(4,'2022-05-17 20:00:00','Filmen',10,4),(5,'2022-05-17 20:00:00','Rapid Miner',20,5),(6,'2022-05-17 20:00:00','Nix',20,2),(7,'2022-06-17 11:31:40','Lernen2',100,1);
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
  `urlaubstage` int DEFAULT NULL,
  `krankheitstage` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arbeitszeitkonto`
--

LOCK TABLES `arbeitszeitkonto` WRITE;
/*!40000 ALTER TABLE `arbeitszeitkonto` DISABLE KEYS */;
INSERT INTO `arbeitszeitkonto` VALUES (2,'2022-06-21 20:14:10',6.533,1,15),(4,'2022-05-17 20:00:00',0,30,0),(5,'2022-05-17 20:00:00',0,30,0),(6,'2022-05-17 20:00:00',0,30,0),(7,'2022-05-17 20:00:00',32,30,0),(8,'2022-06-17 16:58:46',21,20,20);
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
) ENGINE=InnoDB AUTO_INCREMENT=4325 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buchung`
--

LOCK TABLES `buchung` WRITE;
/*!40000 ALTER TABLE `buchung` DISABLE KEYS */;
INSERT INTO `buchung` VALUES (2,'2022-06-16 19:17:12','2022-06-16',2,0,1,2),(5,'2022-06-17 11:30:56','2022-06-17',1,0,2,5),(7,'2022-06-17 11:30:56','2022-06-17',1,0,1,1),(8,'2022-06-17 11:30:56','2022-06-17',1,0,4,5),(9,'2022-06-17 11:30:56','2022-06-17',1,0,1,2),(10,'2022-06-21 11:49:57','2022-06-20',9,0,3,1),(11,'2022-06-21 17:36:32','2022-06-21',18,0,3,1),(12,'2022-06-22 15:23:31','2022-06-22',3.38,0,3,5);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ereignis`
--

LOCK TABLES `ereignis` WRITE;
/*!40000 ALTER TABLE `ereignis` DISABLE KEYS */;
INSERT INTO `ereignis` VALUES (1,'2022-06-02 17:17:06','2022-06-02 17:17:06'),(2,'2022-06-02 17:17:15','2022-06-02 17:17:06'),(3,'2022-06-02 17:17:15','2022-06-02 17:17:06'),(4,'2022-06-02 17:17:16','2022-06-02 17:17:06'),(5,'2022-06-02 17:17:17','2022-06-02 17:17:06');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `person`
--

LOCK TABLES `person` WRITE;
/*!40000 ALTER TABLE `person` DISABLE KEYS */;
INSERT INTO `person` VALUES (1,'2022-06-02 10:54:32','Lisaaa','Mülleraa','MüllerMailaa','müüllleeeraa','dwqjnw8931u489',1),(2,'2022-06-22 14:51:02','Tom','Tommer','email@web.de','Tommi','',0),(3,'2022-06-20 23:55:39','Tom','string','string','string','kajsnfkjansfi3',0),(4,'2022-05-17 20:00:00','Ralf','Roller','ralf.roller@web.de','ralle44','diuh128231',4),(5,'2022-06-01 22:14:26','Peter','Panne','ppmail','pppi','kwuqie8714',5),(6,'2022-06-13 21:33:29','Perry','Dettke','pp@mail-de','pdpdwa','',6),(7,'2022-06-13 21:35:47','a','a','a','a','',7);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt`
--

LOCK TABLES `projekt` WRITE;
/*!40000 ALTER TABLE `projekt` DISABLE KEYS */;
INSERT INTO `projekt` VALUES (1,'2022-06-01 18:56:42','Mathe','Lehrer',1),(3,'2022-05-17 20:00:00','Pneumatik','Mildenberger',1),(4,'2022-05-17 20:00:00','Web-Technologien','Kunz',2),(5,'2022-05-17 20:00:00','Datenbanken','Lehmamn',2),(6,'2022-06-17 11:21:52','testt','testt',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt_person`
--

LOCK TABLES `projekt_person` WRITE;
/*!40000 ALTER TABLE `projekt_person` DISABLE KEYS */;
INSERT INTO `projekt_person` VALUES (1,1,1),(2,3,1),(3,2,3),(4,2,1),(5,3,5);
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
  `start` varchar(45) NOT NULL,
  `ende` varchar(45) DEFAULT NULL,
  `dauer` float DEFAULT NULL,
  `pausen_start` varchar(45) DEFAULT NULL,
  `pausen_ende` varchar(45) DEFAULT NULL,
  `pausen_dauer` float DEFAULT NULL,
  `person_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zeitintervall`
--

LOCK TABLES `zeitintervall` WRITE;
/*!40000 ALTER TABLE `zeitintervall` DISABLE KEYS */;
INSERT INTO `zeitintervall` VALUES (3,'2022-06-22 17:49:28','string','string',0,'string','string',0,2),(4,'2022-06-18 17:45:51','2022-06-18 17:45:51','2022-06-19 17:56:24',2.5,NULL,NULL,0,2),(5,'2022-06-22 15:21:45','2022-06-22 15:21:37','2022-06-22 15:21:44',0.002,NULL,NULL,0,2),(6,'2022-06-22 15:22:25','2022-06-22 15:22:13','2022-06-22 15:22:24',0.003,NULL,NULL,0,2),(7,'2022-06-22 15:22:32','2022-06-22 15:22:31',NULL,0,NULL,NULL,0,2),(8,'2022-06-22 15:22:35','2022-06-22 15:22:34',NULL,0,NULL,NULL,0,2),(9,'2022-06-22 17:54:49','2022-06-22 17:54:46',NULL,0,NULL,NULL,0,2),(38,'2022-06-22 19:19:32','2022-06-22 19:19:25','2022-06-22 19:19:32',0.002,'2022-06-22 19:19:27','2022-06-22 19:19:29',2,2),(39,'2022-06-22 19:36:53','2022-06-22 19:36:39','2022-06-22 19:36:52',0.004,NULL,NULL,0,2),(40,'2022-06-22 19:37:07','2022-06-22 19:37:04','2022-06-22 19:37:06',0.001,NULL,NULL,0,2),(41,'2022-06-22 19:37:23','2022-06-22 19:37:19','2022-06-22 19:37:23',0.001,'2022-06-22 19:37:21',NULL,0,2);
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

-- Dump completed on 2022-06-22 19:41:22
