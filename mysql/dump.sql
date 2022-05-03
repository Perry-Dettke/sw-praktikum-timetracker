-- MySQL dump 10.13  Distrib 8.0.28, for macos11 (x86_64)
--
-- Host: 127.0.0.1    Database: timetracker
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `Aktivitaet`
--

DROP TABLE IF EXISTS `Aktivitaet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Aktivitaet` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` varchar(45) NOT NULL,
  `bezeichnung` varchar(100) NOT NULL,
  `kapazitaet` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Aktivitaet`
--

LOCK TABLES `Aktivitaet` WRITE;
/*!40000 ALTER TABLE `Aktivitaet` DISABLE KEYS */;
/*!40000 ALTER TABLE `Aktivitaet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arbeitszeitkonto`
--

DROP TABLE IF EXISTS `arbeitszeitkonto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `arbeitszeitkonto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` varchar(45) NOT NULL,
  `arbeitsleistung` decimal(4,2) NOT NULL,
  `buchung_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `buchung` (`buchung_id`),
  CONSTRAINT `arbeitzeitskonto_fk_1` FOREIGN KEY (`buchung_id`) REFERENCES `Buchung` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arbeitszeitkonto`
--

LOCK TABLES `arbeitszeitkonto` WRITE;
/*!40000 ALTER TABLE `arbeitszeitkonto` DISABLE KEYS */;
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
  `letzte_aenderung` varchar(45) NOT NULL,
  `person_id` int NOT NULL,
  `arbeitszeitkonto_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `arbeitszeitkonto_id` (`arbeitszeitkonto_id`),
  CONSTRAINT `buchung_fk_1` FOREIGN KEY (`person_id`) REFERENCES `Person` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `buchung_fk_2` FOREIGN KEY (`arbeitszeitkonto_id`) REFERENCES `Arbeitszeitkonto` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buchung`
--

LOCK TABLES `buchung` WRITE;
/*!40000 ALTER TABLE `buchung` DISABLE KEYS */;
/*!40000 ALTER TABLE `buchung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ereignis`
--

DROP TABLE IF EXISTS `Ereignis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ereignis` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` varchar(45) NOT NULL,
  `erstellungs_zeitpunkt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ereignis`
--

LOCK TABLES `Ereignis` WRITE;
/*!40000 ALTER TABLE `Ereignis` DISABLE KEYS */;
/*!40000 ALTER TABLE `Ereignis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Person`
--

DROP TABLE IF EXISTS `Person`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Person` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` varchar(45) NOT NULL,
  `vor_name` varchar(45) NOT NULL,
  `nach_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `benutzer_name` varchar(45) NOT NULL,
  `google_user_id` varchar(45) NOT NULL,
  `arbeitszeitkonto_id` int NOT NULL,
  `projekt_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `arbeitszeitkonto_id` (`arbeitszeitkonto_id`),
  KEY `projekt_id` (`projekt_id`),
  CONSTRAINT `person_fk_1` FOREIGN KEY (`arbeitszeitkonto_id`) REFERENCES `Arbeitszeitkonto` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `person_fk_2` FOREIGN KEY (`projekt_id`) REFERENCES `Projekt` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Person`
--

LOCK TABLES `Person` WRITE;
/*!40000 ALTER TABLE `Person` DISABLE KEYS */;
/*!40000 ALTER TABLE `Person` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projekt`
--

DROP TABLE IF EXISTS `projekt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projekt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `letzte_aenderung` varchar(45) NOT NULL,
  `bezeichnung` varchar(45) NOT NULL,
  `auftraggeber` varchar(45) NOT NULL,
  `aktivitaet_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `aktivitaet_id` (`aktivitaet_id`),
  CONSTRAINT `projekt_fk_1` FOREIGN KEY (`aktivitaet_id`) REFERENCES `Aktivitaet` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt`
--

LOCK TABLES `projekt` WRITE;
/*!40000 ALTER TABLE `projekt` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
  KEY `person_id` (`person_id`),
  KEY `projekt_id` (`projekt_id`),
  CONSTRAINT `projekt_person_fk_1` FOREIGN KEY (`person_id`) REFERENCES `Person` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `projekt_person_fk_2` FOREIGN KEY (`projekt_id`) REFERENCES `Projekt` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projekt_person`
--

LOCK TABLES `projekt_person` WRITE;
/*!40000 ALTER TABLE `projekt_person` DISABLE KEYS */;
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
  `letzte_aenderung` varchar(45) NOT NULL,
  `start` decimal(4,2) NOT NULL,
  `ende` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zeitintervall`
--

LOCK TABLES `zeitintervall` WRITE;
/*!40000 ALTER TABLE `zeitintervall` DISABLE KEYS */;
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

-- Dump completed on 2022-05-03 11:23:25
