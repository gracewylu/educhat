-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 12, 2016 at 06:55 PM
-- Server version: 5.7.11-log
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `edudevelopment`
--

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE IF NOT EXISTS `class` (
  `classID` int(3) NOT NULL,
  `CRN` varchar(7) NOT NULL,
  `className` varchar(45) NOT NULL,
  `deptID` int(3) NOT NULL,
  PRIMARY KEY (`classID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`classID`, `CRN`, `className`, `deptID`) VALUES
(101, 'FIN320', 'Intro to Finance', 100),
(102, 'CMIS450', 'Database Design', 100),
(103, 'MS251', 'Business Statistics', 100),
(201, 'CS140', 'Intro to Computer SCience', 200),
(202, 'MAT260', 'Calculus II', 200),
(203, 'CS314', 'Operating Systems', 200),
(301, 'NRS200', 'Fundamentals of Nursing', 300),
(302, 'NRS320', 'Clincals', 300),
(303, 'BIO140', 'Intro to Biology', 300);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE IF NOT EXISTS `department` (
  `deptID` int(3) NOT NULL,
  `deptName` varchar(45) NOT NULL,
  PRIMARY KEY (`deptID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`deptID`, `deptName`) VALUES
(100, 'BUSINESS'),
(200, 'ENGINEERING'),
(300, 'NURSING');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `MessageID` int(8) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) NOT NULL,
  `text` varchar(450) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `classID` int(3) NOT NULL,
  PRIMARY KEY (`MessageID`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`MessageID`, `username`, `text`, `time`, `classID`) VALUES
(1, 'everduin', 'This is the first test message', '2016-03-12 14:54:24', 0),
(2, 'everduin', 'This is the second message, testing auto increment primary key!', '2016-03-12 15:00:15', 0);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `username` varchar(15) NOT NULL,
  `email` varchar(25) NOT NULL,
  `password` varchar(20) NOT NULL,
  `first` varchar(20) NOT NULL,
  `last` varchar(20) NOT NULL,
  `major` varchar(40) NOT NULL,
  `department` varchar(20) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`username`, `email`, `password`, `first`, `last`, `major`, `department`) VALUES
('everduin', 'everduin94@gmail.com', 'PASSWORD1', 'Erik', 'Verduin', 'CMIS', 'Business');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
