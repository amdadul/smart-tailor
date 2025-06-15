ALTER TABLE `style_categories` ADD `created_by` int;--> statement-breakpoint
ALTER TABLE `style_categories` ADD `updated_by` int;--> statement-breakpoint
ALTER TABLE `style_categories` ADD CONSTRAINT `style_categories_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `style_categories` ADD CONSTRAINT `style_categories_updated_by_users_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;