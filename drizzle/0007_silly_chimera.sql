CREATE TABLE `payments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subscription_id` int NOT NULL,
	`amount` decimal(10,2) NOT NULL,
	`method` tinyint NOT NULL DEFAULT 1,
	`status` tinyint NOT NULL DEFAULT 0,
	`transaction_id` varchar(100),
	`created_at` datetime DEFAULT NOW(),
	`is_success` boolean DEFAULT false,
	CONSTRAINT `payments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_subscription_id_subscriptions_id_fk` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE no action ON UPDATE no action;