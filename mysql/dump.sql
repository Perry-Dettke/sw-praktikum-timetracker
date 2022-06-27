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
INSERT INTO `aktivitaet` VALUES (1,'2022-05-17 20:00:00','Lernen',300,1),(2,'2022-05-17 20:00:00','Pandas',20,3),(3,'2022-05-17 20:00:00','Programmieren',200,3),(4,'2022-05-17 20:00:00','Filmen',10,4),(5,'2022-05-17 20:00:00','Rapid Miner',20,5),(6,'2022-05-17 20:00:00','Nix',20,2),(7,'2022-06-17 11:31:40','Lernen2',100,1),(8,'2022-06-22 22:10:18','aa',1,14),(9,'2022-06-22 22:10:35','a',1,15);
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
INSERT INTO `arbeitszeitkonto` VALUES (2,'2022-06-23 15:37:03',0.00742274,0,22),(4,'2022-06-25 11:11:51',0.0146471,30,0),(5,'2022-05-17 20:00:00',0,30,0),(6,'2022-05-17 20:00:00',0,30,0),(7,'2022-05-17 20:00:00',32,30,0),(8,'2022-06-17 16:58:46',21,20,20),(11,'2022-06-25 11:11:21',0,0,0);
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
INSERT INTO `buchung` VALUES (2,'2022-06-16 19:17:12','2022-06-16',2,1,2),(5,'2022-06-17 11:30:56','2022-06-17',1,2,5),(7,'2022-06-17 11:30:56','2022-06-17',1,1,1),(8,'2022-06-17 11:30:56','2022-06-17',1,4,5),(9,'2022-06-17 11:30:56','2022-06-17',1,1,2),(10,'2022-06-21 11:49:57','2022-06-20',9,3,1),(11,'2022-06-21 17:36:32','2022-06-21',18,3,1),(12,'2022-06-22 15:23:31','2022-06-22',3.38,3,5),(13,'2022-06-22 22:09:20','2022-06-22',0,3,1),(14,'2022-06-22 22:10:45','2022-06-22',0,3,8),(15,'2022-06-22 22:10:59','2022-06-22',0,3,9),(16,'2022-06-22 22:11:53','2022-06-22',0,3,8),(17,'2022-06-23 20:10:37','2022-06-23',0,3,8),(18,'2022-06-23 20:10:45','2022-06-23',0,3,9),(19,'2022-06-23 20:17:26','2022-06-23',0,3,8);
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
INSERT INTO `person` VALUES (1,'2022-06-02 10:54:32','Lisaaa','Mülleraa','MüllerMailaa','müüllleeeraa','dwqjnw8931u489',1),(2,'2022-06-22 14:51:02','Tom','Tommer','email@web.de','Tommi','',2),(3,'2022-06-20 23:55:39','Tom','string','string','string','kajsnfkjansfi3',0),(4,'2022-05-17 20:00:00','Ralf','Roller','ralf.roller@web.de','ralle44','diuh128231',4),(5,'2022-06-01 22:14:26','Peter','Panne','ppmail','pppi','kwuqie8714',5),(6,'2022-06-13 21:33:29','Perry','Dettke','pp@mail-de','pdpdwa','',6),(7,'2022-06-13 21:35:47','a','a','a','a','',7),(10,'2022-06-25 11:11:21','a','a','a','a','2u80WZosnadhZ7cjTgzHNcrj46I3',11);
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
  `startzeitraum` varchar(45) NOT NULL,
  `endzeitraum` varchar(45) NOT NULL,
  `projektersteller_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt`
--

LOCK TABLES `projekt` WRITE;
/*!40000 ALTER TABLE `projekt` DISABLE KEYS */;
INSERT INTO `projekt` VALUES (1,'2022-06-23 19:58:00','Mathe','Lehrer','2022-06-12','2022-06-28',1),(3,'2022-05-17 20:00:00','Pneumatik','Mildenberger','2022-06-29T19:43:00.000Z','2022-06-01',1),(4,'2022-05-17 20:00:00','Web-Technologien','Kunz','2022-06-29T19:43:00.000Z','2022-06-01',2),(5,'2022-05-17 20:00:00','Datenbanken','Lehmamn','2022-06-01','2022-06-01',2),(6,'2022-06-17 11:21:52','testt','testt','2022-06-01','2022-06-01',2),(7,'2022-06-22 21:43:26','testt','testt','2022-06-29T19:43:00.000Z','2022-06-30T19:43:01.000Z',3),(8,'2022-06-22 21:43:26','testt','testt','2022-06-29T19:43:00.000Z','2022-06-30T19:43:01.000Z',3),(9,'2022-06-22 21:43:45','flugbrot','q','2022-06-28T19:43:41.000Z','2022-06-30T19:43:43.000Z',3),(10,'2022-06-22 22:02:18','flugbrot','a','1656446534000','1656619336000',3),(11,'2022-06-22 22:02:53','flugbrot','a','1656446534000','1656619336000',3),(12,'2022-06-22 22:06:02','a','a','2022-06-30T20:05:58.000Z','2022-06-30T20:06:00.000Z',3),(13,'2022-06-22 22:06:14','a','a','2022-06-19T22:00:00.000Z','2022-06-30T20:06:00.000Z',3),(14,'2022-06-22 22:10:07','True','a','2022-06-12T20:09:58.000Z','2022-06-30T20:10:01.000Z',3),(15,'2022-06-22 22:10:28','False','a','2022-06-29T20:09:58.000Z','2022-06-30T20:10:01.000Z',3),(16,'2022-06-23 19:47:08','aaa','flugbrot','2022-06-23','2022-06-30',3),(17,'2022-06-25 09:11:11','flugbrot','flugbrot','2022-06-22','2022-06-30',3),(18,'2022-06-25 11:12:09','a','a','2022-06-21','2022-06-30',3);
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
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt_person`
--

LOCK TABLES `projekt_person` WRITE;
/*!40000 ALTER TABLE `projekt_person` DISABLE KEYS */;
INSERT INTO `projekt_person` VALUES (1,1,1),(3,2,3),(5,3,5),(23,0,7),(24,3,8),(25,2,8),(26,3,9),(27,1,9),(28,3,10),(29,2,10),(30,3,7),(31,3,8),(32,4,7),(33,4,8),(34,3,9),(35,1,9),(36,3,10),(37,2,10),(38,3,11),(39,2,11),(40,3,12),(41,2,12),(42,3,13),(43,2,13),(44,3,14),(45,1,14),(46,3,15),(47,1,15),(48,3,16),(49,2,16),(50,1,1),(51,3,17),(52,4,17),(53,3,18),(54,4,18);
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
INSERT INTO `zeitintervall` VALUES (1,'2022-06-23 14:28:02','2022-06-23 14:27:59','2022-06-23 14:28:01',0.001,NULL,NULL,0,2),(2,'2022-06-23 14:28:20','2022-06-23 14:28:16','2022-06-23 14:28:19',0.001,NULL,NULL,0,2),(3,'2022-06-23 14:30:34','2022-06-23 14:30:29','2022-06-23 14:30:33',0.001,NULL,NULL,0,2),(5,'2022-06-23 14:31:48','2022-06-23 14:31:41','2022-06-23 14:31:47',0.002,NULL,NULL,0,2),(6,'2022-06-23 15:37:02','2022-06-23 15:36:58','2022-06-23 15:37:02',0.001,NULL,NULL,0,2),(8,'2022-06-24 20:56:55','2022-06-24 20:56:52','2022-06-24 20:56:55',0.001,NULL,NULL,0,2),(9,'2022-06-25 09:10:39','2022-06-25 09:10:34','2022-06-25 09:10:38',0.001,NULL,NULL,0,2),(10,'2022-06-25 11:10:15','2022-06-25 11:10:10','2022-06-25 11:10:14',0.001,NULL,NULL,0,2);
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

-- Dump completed on 2022-06-25 11:27:12
