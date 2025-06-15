ALTER TABLE `product_measurements` ADD `created_by` int;--> statement-breakpoint
ALTER TABLE `product_measurements` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `product_measurements` ADD `updated_by` int;--> statement-breakpoint
ALTER TABLE `product_measurements` ADD `updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `product_styles` ADD `created_by` int;--> statement-breakpoint
ALTER TABLE `product_styles` ADD `created_at` timestamp DEFAULT (now());--> statement-breakpoint
ALTER TABLE `product_styles` ADD `updated_by` int;--> statement-breakpoint
ALTER TABLE `product_styles` ADD `updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE `style_options` ADD `created_by` int;--> statement-breakpoint
ALTER TABLE `style_options` ADD `updated_by` int;--> statement-breakpoint
ALTER TABLE `product_measurements` ADD CONSTRAINT `product_measurements_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_measurements` ADD CONSTRAINT `product_measurements_updated_by_users_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_styles` ADD CONSTRAINT `product_styles_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_styles` ADD CONSTRAINT `product_styles_updated_by_users_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `style_options` ADD CONSTRAINT `style_options_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `style_options` ADD CONSTRAINT `style_options_updated_by_users_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;