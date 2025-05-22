CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`business_id` int NOT NULL,
	`plan_id` int NOT NULL,
	`plan_price` timestamp NOT NULL,
	`payment_method` tinyint NOT NULL,
	`payment_status` tinyint NOT NULL,
	`start_date` timestamp,
	`end_date` timestamp,
	`trial_end_date` timestamp,
	`is_active` boolean DEFAULT true,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_business_id_businesses_id_fk` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_plan_id_plans_id_fk` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE no action ON UPDATE no action;