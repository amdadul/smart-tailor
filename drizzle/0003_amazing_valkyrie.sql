CREATE TABLE `businesses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`address` varchar(255) NOT NULL,
	`logo` varchar(255),
	`owner_id` int,
	`status` tinyint NOT NULL DEFAULT 1,
	`created_at` timestamp DEFAULT (now()),
	CONSTRAINT `businesses_id` PRIMARY KEY(`id`),
	CONSTRAINT `businesses_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
CREATE TABLE `plans` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`description` text,
	`store_limit` int NOT NULL,
	`user_limit` int NOT NULL,
	`monthly_order_limit` int NOT NULL,
	`price` int NOT NULL,
	`trial_days` int NOT NULL,
	`interval_days` int NOT NULL,
	`status` tinyint NOT NULL DEFAULT 1,
	CONSTRAINT `plans_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `stores` (
	`id` int AUTO_INCREMENT NOT NULL,
	`business_id` int NOT NULL,
	`name` varchar(200) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`address` varchar(255) NOT NULL,
	`is_auto` tinyint NOT NULL DEFAULT 1,
	`status` tinyint NOT NULL DEFAULT 1,
	CONSTRAINT `stores_id` PRIMARY KEY(`id`),
	CONSTRAINT `stores_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `business_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `store_id` int;--> statement-breakpoint
ALTER TABLE `businesses` ADD CONSTRAINT `businesses_owner_id_users_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stores` ADD CONSTRAINT `stores_business_id_businesses_id_fk` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_business_id_businesses_id_fk` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_store_id_stores_id_fk` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE no action ON UPDATE no action;