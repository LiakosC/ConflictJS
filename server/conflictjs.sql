-- phpMyAdmin SQL Dump
-- version 4.5.0.2
-- http://www.phpmyadmin.net
--
-- Φιλοξενητής: 127.0.0.1
-- Χρόνος δημιουργίας: 26 Σεπ 2016 στις 17:28:34
-- Έκδοση διακομιστή: 10.0.17-MariaDB
-- Έκδοση PHP: 5.6.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `conflict2_1`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(64) NOT NULL,
  `wsCode` varchar(50) NOT NULL,
  `signupStamp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Άδειασμα δεδομένων του πίνακα `accounts`
--

INSERT INTO `accounts` (`id`, `email`, `password`, `wsCode`, `signupStamp`) VALUES
(1, 'liakos100x@gmail.com', '8c35f0f38a5f3b4e5413c859c6eac1f1c3e831b034b4ee69d49b0a327f9fb448', '7eefc9700bf4302a545c1352ea60087e9bd44fdaf3d5050846', 1448194836),
(10, 'liakos2@gmail.com', 'd4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35', 'e401a7aec49712dfeff1a749bcbf6ee7ee3b8c9fd3f9ab9c55', 1448194837),
(11, 'marirena_am@yahoo.gr', 'ce14933ea1773ac901143161b31439058bdb50c7b65e9af2e6a7d5fcf29928c7', '8c746dea0fc112b955d8ea215971b84ded656848f162f9aa4b', 1448196108),
(12, 'yio.ta.ki@hotmail.com', '78c9236a36923c474aaf032df097d1bd2062a6f28ddefe99c47a9ee63c50d916', '88ad8623cfbe3efc940347e469089d1de3e6d26d940fffa02a', 1448205173),
(13, 'thanosapostolou@hotmail.com', 'fa9e1d22205ad852b0dc9509ec4e31644e88742c4dfce93c08f011fee1cd8a1a', '8dcfde7111f0cfb7d57e7d2f5f7d7bdec0ef9779d438fe4b1f', 1448216252),
(14, 'draven@draven.com', '625335d1f20092606ecb9e5dc028bd83225db34f2bdb2294fdd5d102adfb4e5a', '', 1448890514),
(15, 'draven@dravening.com', '114d81e64a5d88b28f8393e0f75530c909e76b85af64e88f30835fb66c1ddb8a', '15146bd7f3a54b9f4cf04703b782d4ae0811b63e08e6103232', 1448890554);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `players`
--

CREATE TABLE `players` (
  `id` int(11) NOT NULL,
  `accountID` int(11) NOT NULL,
  `uniqid` varchar(50) NOT NULL,
  `name` varchar(25) NOT NULL,
  `worldCode` varchar(25) NOT NULL DEFAULT 'start',
  `x` int(11) NOT NULL DEFAULT '2500',
  `y` int(11) NOT NULL DEFAULT '2300',
  `angle` float NOT NULL,
  `baseX` int(11) NOT NULL DEFAULT '2500',
  `baseY` int(11) NOT NULL DEFAULT '2300'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Άδειασμα δεδομένων του πίνακα `players`
--

INSERT INTO `players` (`id`, `accountID`, `uniqid`, `name`, `worldCode`, `x`, `y`, `angle`, `baseX`, `baseY`) VALUES
(2, 1, '564385075ab8d', 'Illidan', 'start', 222, 222, 1.46312, 2500, 2300),
(24, 10, '5651b324b3fcc', 'Liakos2', 'start', 2500, 2300, 0, 2500, 2300),
(25, 12, '5651e3c39cca5', 'Smaug', 'start', 2038, 2448, -2.92813, 2500, 2300),
(26, 11, '5651e64dcdaa2', 'Kouneli', 'start', 2172, 2414, -0.743777, 2500, 2300),
(27, 13, '565207ccd0e4d', 'Xwriaths', 'start', 1070, 2345, 0.992336, 2500, 2300),
(29, 15, '565c529c5ba8d', 'Draven', 'start', 2252, 2906, -1.57307, 2500, 2300),
(31, 1, '56def4920392e', 'Fdseefs11231', 'start', 20, 20, 0, 2500, 2300),
(32, 1, '56def4c225730', 'Fdseefs1131g', 'start', 20, 20, 0, 2500, 2300);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `portals`
--

CREATE TABLE `portals` (
  `id` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `worldCode` varchar(25) NOT NULL,
  `x` int(11) NOT NULL,
  `y` int(11) NOT NULL,
  `target_worldCode` varchar(25) NOT NULL,
  `target_x` int(11) NOT NULL,
  `target_y` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Άδειασμα δεδομένων του πίνακα `portals`
--

INSERT INTO `portals` (`id`, `name`, `worldCode`, `x`, `y`, `target_worldCode`, `target_x`, `target_y`) VALUES
(1, 'Sand Prison', 'start', 1966, 2851, 'forest', 210, 250),
(2, '', '', 0, 0, '', 0, 0),
(3, '', '', 0, 0, '', 0, 0),
(4, '', '', 0, 0, '', 0, 0);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `code` varchar(25) NOT NULL,
  `name` varchar(50) NOT NULL,
  `level` int(11) NOT NULL DEFAULT '1',
  `speed` int(11) NOT NULL DEFAULT '100'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Άδειασμα δεδομένων του πίνακα `units`
--

INSERT INTO `units` (`id`, `code`, `name`, `level`, `speed`) VALUES
(1, 'spider1', 'Spider', 1, 100),
(2, 'wolf1', 'Wolf', 1, 100),
(3, 'zombie1', 'Zombie', 1, 100),
(4, 'hero', 'Hero', 1, 100),
(5, '', '', 1, 100),
(6, '', '', 1, 100),
(7, '', '', 1, 100);

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `worlds`
--

CREATE TABLE `worlds` (
  `id` int(11) NOT NULL,
  `code` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Άδειασμα δεδομένων του πίνακα `worlds`
--

INSERT INTO `worlds` (`id`, `code`, `name`) VALUES
(1, 'start', 'The Castle'),
(2, 'forest', 'Dark Forest');

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Ευρετήρια για πίνακα `players`
--
ALTER TABLE `players`
  ADD PRIMARY KEY (`id`),
  ADD KEY `accountID` (`accountID`);

--
-- Ευρετήρια για πίνακα `portals`
--
ALTER TABLE `portals`
  ADD PRIMARY KEY (`id`);

--
-- Ευρετήρια για πίνακα `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Ευρετήρια για πίνακα `worlds`
--
ALTER TABLE `worlds`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT για πίνακα `players`
--
ALTER TABLE `players`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
--
-- AUTO_INCREMENT για πίνακα `portals`
--
ALTER TABLE `portals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT για πίνακα `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT για πίνακα `worlds`
--
ALTER TABLE `worlds`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
