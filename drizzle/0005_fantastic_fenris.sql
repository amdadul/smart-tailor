ALTER TABLE `subscriptions` MODIFY COLUMN `start_date` timestamp DEFAULT null;--> statement-breakpoint
ALTER TABLE `subscriptions` MODIFY COLUMN `end_date` timestamp DEFAULT null;--> statement-breakpoint
ALTER TABLE `subscriptions` MODIFY COLUMN `trial_end_date` timestamp DEFAULT null;