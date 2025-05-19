CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(250),
	`type` tinyint NOT NULL,
	`password` text NOT NULL,
	`profile_picture` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_phone_unique` UNIQUE(`phone`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
