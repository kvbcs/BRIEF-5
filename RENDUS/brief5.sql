CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `first_name` varchar(255),
  `last_name` varchar(255),
  `email` varchar(255),
  `address` varchar(255),
  `phone_number` integer,
  `password` varchar(255),
  `role` varchar(255),
  `created_at` datetime,
  `gdpr` datetime
);

CREATE TABLE `equipement_rent` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `equipement_id` integer,
  `rent_start` datetime,
  `rent_end` datetime,
  `price` integer
);

CREATE TABLE `equipement` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `description` varchar(255),
  `category` varchar(255),
  `stock` integer
);

ALTER TABLE `equipement_rent` ADD FOREIGN KEY (`equipement_id`) REFERENCES `equipement` (`id`);

ALTER TABLE `equipement_rent` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
