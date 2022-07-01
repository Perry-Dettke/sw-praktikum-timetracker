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
INSERT INTO `aktivitaet` VALUES (1,'2022-06-28 10:30:46','Basketball',100,1),(2,'2022-07-01 12:02:17','Volleyball',20,1),(3,'2022-07-01 12:02:22','Volleyball',100,1),(4,'2022-07-01 12:02:28','Volleyball',25,1),(5,'2022-06-29 12:59:19','Schwimmen',50,1),(6,'2022-06-29 13:04:35','Diagramme erstellen',20,2),(7,'2022-07-01 12:01:59','Programmieren',250,2),(8,'2022-06-29 13:04:53','Deployen',10,2),(9,'2022-06-29 13:05:34','Testing',50,2);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arbeitszeitkonto`
--

LOCK TABLES `arbeitszeitkonto` WRITE;
/*!40000 ALTER TABLE `arbeitszeitkonto` DISABLE KEYS */;
INSERT INTO `arbeitszeitkonto` VALUES (1,'2022-06-28 10:30:46',0,15,0),(2,'2022-07-01 11:02:49',0,12,3),(3,'2022-06-29 12:11:27',0,15,0),(4,'2022-06-29 12:11:27',0,15,0),(5,'2022-07-01 11:57:33',45,15,0);
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
INSERT INTO `buchung` VALUES (1,'2022-07-01 11:39:45','2022-05-01',1,5,1),(2,'2022-07-01 11:39:45','2022-05-01',5,5,6),(3,'2022-07-01 11:39:45','2022-05-01',2,5,2),(4,'2022-07-01 11:39:45','2022-05-19',8,5,7),(5,'2022-07-01 11:41:59','2022-06-20',5,5,7),(6,'2022-07-01 11:41:59','2022-06-20',2,5,5),(7,'2022-07-01 11:41:59','2022-06-28',6,1,7),(8,'2022-07-01 11:41:59','2022-07-01',6,5,8),(9,'2022-07-01 11:41:59','2022-07-01',4,5,9),(10,'2022-07-01 11:41:59','2022-07-02',2,5,5),(11,'2022-07-01 11:41:59','2022-07-02',2,5,2),(12,'2022-07-01 11:41:59','2022-07-02',2,5,1),(13,'2022-07-01 11:41:59','2022-07-02',5,1,1),(14,'2022-07-01 11:41:59','2022-07-02',10,1,9),(15,'2022-07-01 11:41:59','2022-07-02',8,1,7),(16,'2022-07-01 11:41:59','2022-07-02',7,1,8),(17,'2022-07-01 11:41:59','2022-06-02',10,2,9),(18,'2022-07-01 11:41:59','2022-06-02',6,2,8),(19,'2022-07-01 11:41:59','2022-06-02',2,2,6),(20,'2022-07-01 11:41:59','2022-06-02',4,2,7),(21,'2022-07-01 11:41:59','2022-07-02',9,3,8),(22,'2022-07-01 11:41:59','2022-07-02',10,3,9),(23,'2022-07-01 11:41:59','2022-06-02',3,3,6),(24,'2022-07-01 11:41:59','2022-07-02',9,3,7),(25,'2022-07-01 11:41:59','2022-06-02',10,3,1),(26,'2022-07-01 11:41:59','2022-06-02',8,4,2),(27,'2022-07-01 11:41:59','2022-07-02',10,4,6),(28,'2022-07-01 11:41:59','2022-07-02',3,4,7);
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
INSERT INTO `person` VALUES (1,'2022-06-29 12:11:27','Lisa','Müller','lisamüller@gmail.com','lm050','',1),(2,'2022-06-29 12:11:27','Sven','Bayer','svenbayer@gmail.com','sb011','',2),(3,'2022-06-29 12:11:27','Max','Mustermann','maxmustermann@gmail.com','mm099','',3),(4,'2022-06-29 12:11:27','Sarah','Singer','sarahsinger@gmail.com','ss043','',4),(5,'2022-07-01 11:09:14','Perry','Dettke','perry.dettke@gmail.com','pd024','2u80WZosnadhZ7cjTgzHNcrj46I3',5);
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt`
--

LOCK TABLES `projekt` WRITE;
/*!40000 ALTER TABLE `projekt` DISABLE KEYS */;
INSERT INTO `projekt` VALUES (1,'2022-07-01 11:24:25','Sport','VfB Stuttgart','2022-06-01','2022-07-31',5),(2,'2022-07-01 11:30:49','Software-Praktikum','Thies / Kunz','2022-06-01','2022-07-31',5);
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
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt_person`
--

LOCK TABLES `projekt_person` WRITE;
/*!40000 ALTER TABLE `projekt_person` DISABLE KEYS */;
INSERT INTO `projekt_person` VALUES (1,5,1),(2,2,1),(3,3,1),(4,4,1),(5,5,2),(6,2,2),(7,3,2),(8,4,2);
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
INSERT INTO `zeitintervall` VALUES (1,'2022-07-01 11:57:13','2022-05-01 11:15:00','2022-05-01 19:45:00',8.5,'2022-05-01 14:15:00','2022-05-01 14:45:00',0.5,5),(2,'2022-07-01 11:19:25','2022-05-19 09:10:00','2022-05-19 17:25:00',8.25,'2022-05-19 13:10:00','2022-05-19 13:40:00',0.5,5),(3,'2022-07-01 11:16:57','2022-06-20 07:10:43','2022-06-20 16:10:43',9,'2022-06-20 12:10:43','2022-06-20 12:40:43',0.5,5),(4,'2022-07-01 11:21:36','2022-06-28 10:30:43','2022-06-28 16:15:43',5.75,NULL,NULL,0,5),(5,'2022-07-01 11:22:36','2022-07-01 07:22:05','2022-07-01 17:22:05',10,'2022-07-01 11:22:05','2022-07-01 11:52:05',0.5,5),(6,'2022-07-01 11:23:08','2022-07-02 08:54:33','2022-07-02 14:54:33',6,'2022-07-02 12:54:33','2022-07-02 13:24:33',0.5,5);
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

-- Dump completed on 2022-07-01 12:14:34
