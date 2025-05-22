ALTER TABLE `subscriptions` MODIFY COLUMN `plan_price` double NOT NULL;--> statement-breakpoint
ALTER TABLE `subscriptions` MODIFY COLUMN `start_date` datetime;--> statement-breakpoint
ALTER TABLE `subscriptions` MODIFY COLUMN `end_date` datetime;--> statement-breakpoint
ALTER TABLE `subscriptions` MODIFY COLUMN `trial_end_date` datetime;