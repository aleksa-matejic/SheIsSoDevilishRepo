-- phpMyAdmin SQL Dump
-- version 4.4.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 28, 2015 at 06:51 AM
-- Server version: 5.6.26
-- PHP Version: 5.6.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zavrsni_rad`
--

-- --------------------------------------------------------

--
-- Table structure for table `statistics`
--

CREATE TABLE IF NOT EXISTS `statistics` (
  `idStatistics` int(11) NOT NULL,
  `player` text COLLATE utf8_unicode_ci NOT NULL,
  `avoidedWhiteClouds` int(11) NOT NULL,
  `avoidedBlackClouds` int(11) NOT NULL,
  `avoidedArrows` int(11) NOT NULL,
  `distance` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `statistics`
--

INSERT INTO `statistics` (`idStatistics`, `player`, `avoidedWhiteClouds`, `avoidedBlackClouds`, `avoidedArrows`, `distance`, `score`) VALUES
(41, 'aljosa', 17, 12, 1, 12837, 12437),
(42, 'aljosa', 9, 7, 0, 9371, 8871),
(43, 'dsa', 3, 3, 0, 4641, 4341),
(44, 'dsa', 6, 10, 0, 6759, 5359),
(45, 'dsa', 4, 9, 0, 5091, 3691),
(46, 'dsa', 3, 4, 0, 4999, 4499),
(47, 'dsa', 2, 6, 0, 6157, 5157),
(48, 'aljosa', 6, 7, 2, 9219, 9019),
(49, 'dsa', 3, 3, 0, 6269, 5969),
(50, 'aljosa', 3, 6, 0, 5852, 4952),
(51, 'aljosa', 13, 18, 3, 13551, 12151),
(52, 'aljosa', 6, 8, 1, 7687, 6987),
(53, 'aljosa', 12, 9, 0, 7794, 7194),
(54, 'aljosa', 6, 3, 0, 4417, 4417),
(55, 'aljosa', 7, 8, 2, 9911, 9611),
(56, 'aljosa', 5, 8, 0, 9546, 8446),
(57, 'aljosa', 5, 4, 0, 9308, 9008),
(58, 'aljosa', 21, 11, 1, 19613, 19813),
(59, 'aljosa', 8, 5, 0, 10209, 10009),
(60, 'aljosa', 6, 2, 0, 4329, 4529),
(61, 'aljosa', 2, 5, 0, 5311, 4511),
(62, 'aljosa', 10, 10, 0, 9926, 8926),
(63, 'aljosa', 8, 7, 1, 10768, 10468),
(64, 'aljosa', 7, 6, 0, 9664, 9164),
(65, 'aljosa', 10, 13, 1, 13147, 11847),
(66, 'aljosa', 9, 7, 0, 9223, 8723),
(67, 'aljosa', 10, 19, 0, 15606, 12806),
(68, 'aleksa', 10, 5, 2, 9923, 10523),
(69, 'aleksa', 11, 5, 0, 8336, 8436),
(70, 'aleksa', 6, 5, 0, 5876, 5476),
(71, 'aleks', 5, 6, 0, 6318, 5618),
(72, 'aljosa', 10, 10, 1, 14024, 13324),
(73, 'aljosa', 11, 17, 1, 16453, 14453),
(74, 'aljosa', 8, 4, 0, 9934, 9934),
(75, 'aljosa', 9, 3, 0, 9362, 9662),
(76, 'aljosa', 6, 11, 0, 9279, 7679);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `idUser` int(11) NOT NULL,
  `firstName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `lastName` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`idUser`, `firstName`, `lastName`, `email`, `username`, `password`) VALUES
(1, 'Aleksa', 'Matejic', 'aljosa.gk@gmail.com', 'aljosa', 'pass1234'),
(2, 'Mihailo', 'Matejic', 'mihailo.matejic@gmail.com', 'Kimisha', 'itsneverdark');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `statistics`
--
ALTER TABLE `statistics`
  ADD PRIMARY KEY (`idStatistics`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`idUser`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `statistics`
--
ALTER TABLE `statistics`
  MODIFY `idStatistics` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `idUser` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
