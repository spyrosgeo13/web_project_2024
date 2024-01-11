-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 10 Ιαν 2024 στις 14:59:44
-- Έκδοση διακομιστή: 10.4.27-MariaDB
-- Έκδοση PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `web24`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `items`
--

CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `item_details`
--

CREATE TABLE `item_details` (
  `id` int(11) NOT NULL,
  `item_id` int(11) DEFAULT NULL,
  `detail_name` varchar(255) NOT NULL,
  `detail_value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(110) NOT NULL,
  `email` varchar(110) NOT NULL,
  `password` varchar(255) NOT NULL,
  `telephone_number` varchar(110) NOT NULL,
  `lat_user` float(11,7) DEFAULT NULL,
  `lng_user` float(11,7) DEFAULT NULL,
  `user_role` int(10) NOT NULL,
  `user_fullname` text DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Άδειασμα δεδομένων του πίνακα `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `telephone_number`, `lat_user`, `lng_user`, `user_role`, `user_fullname`, `created_at`) VALUES
(2, 'admin', 'admin@gmail.com', 'pasok13', '', 0.0000000, 0.0000000, 0, NULL, '2024-01-04 19:26:42'),
(3, 'dd', 'dd', 'ddd', 'ddd', NULL, NULL, 2, NULL, '2024-01-04 19:26:42'),
(6, 'spiros4334ff', 'spyrosgeo144443@gmail.com', '$2y$10$79YGS4QrhEaJQ2abG95PcuDl9IAI5ZOrxzoJHJ6uIRjuyYSOpxScq', '+306986719379', NULL, NULL, 1, 'Spyridon Georgiopoulos', '2024-01-04 21:23:09'),
(7, 'spirosfwfwefsd', 'spyrosgeo142424243@gmail.com', '$2y$10$xQiLPV0jiJoYQfDUmjZ2FeyITL2xXqX8TI3iWjHCL0B7Vo9elRy3y', '+306986719379', NULL, NULL, 1, 'rerreer', '2024-01-04 21:23:47'),
(8, 'adminvcxgh', 'spyrosgeo1346564rty@gmail.com', '$2y$10$GZZhrnSAS4tX4uO/VbWNIuUURAU6fLddi5UTrK72EM/6jrrI0vQ0m', '+306986719379', 0.0000000, 0.0000000, 1, 'Spyridon Georgiopoulos', '2024-01-05 13:51:31'),
(11, 'admingianado', 'spyrosgeo1423423442232432432343@gmail.com', '$2y$10$myS.wNc4zb10ksNHH.B5.uUbtxdLHEO.cHTYJrSEfYka/NUdlq1XK', '+306986719379', 38.2926865, 0.0000000, 1, 'Spyridon Georgiopoulos', '2024-01-05 14:03:39'),
(13, 'spiros345354533', 'spyrosgeo134354345@gmail.com', '$2y$10$D3QHXjnj1oz5KE3WzHu62et5N90AuW6haXKyXLwOj0JCRuzy0b/3W', '+306986719379', 0.0000000, 0.0000000, 1, 'Spyridon Georgiopoulos', '2024-01-05 14:18:42'),
(15, 'spiroshtfrgsdhrtjuydyrtjujtydr', 'spyrosgeo13432423143343243423243@gmail.com', '$2y$10$A/pDEsAPp7nPDWzTzlzBaOsQiokETePU6kb7QTESTcWYtEDNQ0P16', '+306986719379', NULL, NULL, 1, 'Spyridon Georgiopoulos', '2024-01-05 14:50:16'),
(16, 'spiroshtfrgsdhrtjuydyrtjujtydr4545', 'spyrosgeo134324231433432434232445354346773@gmail.com', '$2y$10$aiwGSORteEr8K/ULCeStV.WuVDmPHpbth2WVgSP7YjIwnQpXiaWma', '+306986719379', NULL, NULL, 1, 'Spyridon Georgiopoulos', '2024-01-05 17:59:52'),
(17, 'spiros454354', 'treygtrteht@gmail.com', '$2y$10$KtInobhI5fOOVigsxpebVeghRkiM3D.CQ0TVPdIFyiFwbfg2GRftG', '+306986719379', NULL, NULL, 1, 'Spyridon Georgiopoulos', '2024-01-05 18:00:23'),
(18, 'spiros45435443243grtefhghg', 'treygtrt45hrfhg4greeht@gmail.com', '$2y$10$.IZ/su0AEU8fao5dWngbde9gk4QEaGPd7vocyIJm6DjWSv5JnJV2G', '+306986719379', NULL, NULL, 1, 'Spyridon Georgiopoulos', '2024-01-05 18:17:38'),
(19, 'spiros4564566645ytrh', 'spyrosgeo13543y45hjgffgjhfjghsdfg@gmail.com', '$2y$10$P8CYkHZBMeHg6URxIdn0YOkz0hcFg.WviChHW4cgXvFgXHe2M.AHS', '+306986719379', NULL, NULL, 1, 'Spyridon Georgiopoulos', '2024-01-05 18:22:55'),
(20, 'spiros456456dfgdfgdfg6645ytrh', 'spyrosgeo13543y45dfbddfdfhjgffgjhfjghsdfg@gmail.com', '$2y$10$oerhezf9sn3W.2QSXvwdFeqm.eypzMl0IVh1nlSq.M3sMK9qhKIlm', '+306986719379', NULL, NULL, 1, 'Spyridon Georgiopoulos', '2024-01-05 18:28:36'),
(21, 'spiros234564ytrhtgfdgdf', 'spyrosgegdffgddfgdfgwegfo13@gmail.com', '$2y$10$Iv3KHR9g2UcrS50mpL/eYe5kXJNSd1g8myxKM.bagnTwTTtPe5sKe', '+306986719379', NULL, NULL, 1, 'Spyridon Georgiopoulos', '2024-01-05 18:37:34'),
(22, 'spirospaoskos', 'spyrosgeo1pasokorthodox3@gmail.com', '$2y$10$2BOEjPeMumCYgh4hFKE9eOVoGc73MZ8aaukOabWP.tW5Vohu7ZICC', '+306986719379', NULL, NULL, 1, 'Spyridon Georgiopoulos', '2024-01-05 18:42:53'),
(23, 'adminhhhhhh', 'spyrosgeo1fduiohbghiobugsdfaoihjusdafgasdfgfg3@gmail.com', '$2y$10$wGlG1e4bgUu0CVdJD3prEOHl8AM5wTSlzuzVmEsq2Xi355et50cmm', '+306986719379', NULL, NULL, 1, 'Spyridon Georgiopoulos', '2024-01-05 18:52:57'),
(24, 'spirospamepo9gg0', 'spyrosgeo13pamedinata@gmail.com', '$2y$10$5W3irM5tL7g/YzLGwzcCjuNQLKL4cvT8PpKuwRgG8al3l8eWWDDHm', '+306986719379', 38.2414169, 21.7254639, 1, 'Spyridon Georgiopoulos', '2024-01-05 18:58:18'),
(25, 'spirosdsijh ibhregwbihjojrgsdaf', 'spyrosgeo1rwereetryetr3@gmail.com', '$2y$10$dnSW3XD0AlA/.0u/hC92ju9m.1jog1.LMCtf7EjF4pN2O14KkNLua', '+306986719379', 0.0000000, 0.0000000, 1, 'Spyridon Georgiopoulos', '2024-01-05 21:07:25'),
(26, 'spirosTELEUTEOPTREST', 'spyrosgeo13GIASIMERA@gmail.com', '$2y$10$gy64AfS0FbRpD7arjmn/4.0JSd2nQS/BpbdOV9Iqn6o3ptXw5H8/m', '+306986719379', 17.8114567, -0.4394531, 1, 'Spyridon Georgiopoulos', '2024-01-06 00:22:02'),
(27, 'spirosytrfghedhdjnfgddfghjdjmhgnsdfbgghsdfdfhng', 'spyrosgeo1435345tegr3564t345tghdftrgetr@gmail.com', '$2y$10$R7jg1ANVWiyxGmZX1SlXp.ObmL7/5MvjJ.LJVGSV3mx0YLrRGJunG', '+306986719379', 38.1428299, 21.5546818, 1, 'Spyridon Georgiopoulos', '2024-01-09 19:22:41');

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `users_roles`
--

CREATE TABLE `users_roles` (
  `id_user` int(11) NOT NULL,
  `id_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Ευρετήρια για πίνακα `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Ευρετήρια για πίνακα `item_details`
--
ALTER TABLE `item_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_id` (`item_id`);

--
-- Ευρετήρια για πίνακα `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Ευρετήρια για πίνακα `users_roles`
--
ALTER TABLE `users_roles`
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT για άχρηστους πίνακες
--

--
-- AUTO_INCREMENT για πίνακα `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `items`
--
ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `item_details`
--
ALTER TABLE `item_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT για πίνακα `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

--
-- Περιορισμοί για πίνακα `item_details`
--
ALTER TABLE `item_details`
  ADD CONSTRAINT `item_details_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
