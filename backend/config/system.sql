-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2022 at 09:59 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `system`
--
CREATE DATABASE IF NOT EXISTS `system` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `system`;

-- --------------------------------------------------------

--
-- Table structure for table `chats`
--

CREATE TABLE `chats` (
  `id` int(255) NOT NULL,
  `message_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `invites`
--

CREATE TABLE `invites` (
  `id` int(255) NOT NULL,
  `userinvites_id` int(255) NOT NULL,
  `queue_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(255) NOT NULL,
  `text` text NOT NULL,
  `private` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `queues`
--

CREATE TABLE `queues` (
  `id` int(255) NOT NULL,
  `queueusers_id` int(255) NOT NULL,
  `chat_id` int(255) NOT NULL,
  `invite_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `queueusers`
--

CREATE TABLE `queueusers` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `queue_id` int(255) NOT NULL,
  `position` int(255) NOT NULL,
  `startTime` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `userinvites`
--

CREATE TABLE `userinvites` (
  `id` int(255) NOT NULL,
  `user_id` int(255) NOT NULL,
  `invite_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(320) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(16) NOT NULL,
  `type` enum('TEACHER','STUDENT') NOT NULL DEFAULT 'STUDENT',
  `userinvites_id` int(255) NOT NULL,
  `queueusers_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `username`, `password`, `type`, `userinvites_id`, `queueusers_id`) VALUES
(7, 'Milen', 'Petrov', 'milen.petrov@gmailcom', 'milen1406', '892b5f8823a7a260', 'TEACHER', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chats`
--
ALTER TABLE `chats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `message_id` (`message_id`);

--
-- Indexes for table `invites`
--
ALTER TABLE `invites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userinvites_id` (`userinvites_id`),
  ADD UNIQUE KEY `queue_id` (`queue_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `queues`
--
ALTER TABLE `queues`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `queueusers_id` (`queueusers_id`),
  ADD UNIQUE KEY `chat_id` (`chat_id`),
  ADD UNIQUE KEY `invite_id` (`invite_id`);

--
-- Indexes for table `queueusers`
--
ALTER TABLE `queueusers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `queue_id` (`queue_id`);

--
-- Indexes for table `userinvites`
--
ALTER TABLE `userinvites`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id of userinvites` (`user_id`),
  ADD UNIQUE KEY `invite_id of userinvites` (`invite_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `invite_id` (`userinvites_id`),
  ADD UNIQUE KEY `queueusers_id` (`queueusers_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chats`
--
ALTER TABLE `chats`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invites`
--
ALTER TABLE `invites`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `queues`
--
ALTER TABLE `queues`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `queueusers`
--
ALTER TABLE `queueusers`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userinvites`
--
ALTER TABLE `userinvites`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chats`
--
ALTER TABLE `chats`
  ADD CONSTRAINT `message_id` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invites`
--
ALTER TABLE `invites`
  ADD CONSTRAINT `invites_id` FOREIGN KEY (`userinvites_id`) REFERENCES `userinvites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `queue_id` FOREIGN KEY (`queue_id`) REFERENCES `queues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `queues`
--
ALTER TABLE `queues`
  ADD CONSTRAINT `chat_id` FOREIGN KEY (`chat_id`) REFERENCES `chats` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `queue_invite_id` FOREIGN KEY (`invite_id`) REFERENCES `invites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `queueusers_id` FOREIGN KEY (`queueusers_id`) REFERENCES `queueusers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `queueusers`
--
ALTER TABLE `queueusers`
  ADD CONSTRAINT `queueusers_queue_id` FOREIGN KEY (`queue_id`) REFERENCES `queues` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `queueusers_user_id_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `userinvites`
--
ALTER TABLE `userinvites`
  ADD CONSTRAINT `invite_id` FOREIGN KEY (`invite_id`) REFERENCES `invites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `queue_users` FOREIGN KEY (`queueusers_id`) REFERENCES `queueusers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_invites` FOREIGN KEY (`userinvites_id`) REFERENCES `userinvites` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
