CREATE TABLE `payment_methods` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`status` boolean DEFAULT true,
	CONSTRAINT `payment_methods_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`business_id` int,
	`delivery_duration` int,
	`trial_duration` int,
	`worker_delivery_duration` int,
	`is_send_sms_after_create` boolean DEFAULT false,
	`create_sms` text,
	`is_send_sms_after_ready` boolean DEFAULT false,
	`ready_sms` text,
	CONSTRAINT `settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `status` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`type` tinyint,
	CONSTRAINT `status_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_details` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` int,
	`product_id` int,
	`special_note` text,
	`quantity` int,
	`unit_price` decimal(10,2),
	`sub_total` decimal(10,2),
	`status` tinyint,
	CONSTRAINT `order_details_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` int,
	`product_id` int,
	`image` varchar(255),
	`status` tinyint,
	CONSTRAINT `order_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_measurements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` int,
	`product_id` int,
	`category_id` int,
	`category_type` tinyint,
	`value` varchar(50),
	`status` tinyint,
	CONSTRAINT `order_measurements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_no` varchar(100),
	`type` tinyint,
	`customer_id` int,
	`customer_name` varchar(100),
	`customer_phone` varchar(20),
	`customer_address` varchar(255),
	`febric_amount` decimal(10,2),
	`stitching_amount` decimal(10,2),
	`extra_amount` decimal(10,2),
	`discount` decimal(10,2),
	`total` decimal(10,2),
	`payment_method_id` int,
	`paid_amount` decimal(10,2),
	`order_status` tinyint,
	`order_date` date,
	`trial_date` date,
	`worker_delivery_date` date,
	`delivery_date` date,
	`is_measurement_dress_given` boolean DEFAULT false,
	`number_of_measurement_dress` int,
	`status` tinyint,
	`created_by` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_by` int,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `order_styles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`order_id` int,
	`product_id` int,
	`style_id` int,
	`style_option_id` int,
	`style_type` tinyint,
	`status` tinyint,
	CONSTRAINT `order_styles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `measurement_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`type` tinyint DEFAULT 1,
	`created_by` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_by` int,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `measurement_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_measurements` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_id` int,
	`category_id` int,
	`category_type` tinyint,
	CONSTRAINT `product_measurements_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`business_id` int,
	`name` varchar(100),
	`price` decimal(10,2),
	`image` varchar(255),
	`created_by` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_by` int,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `products_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_styles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`product_id` int,
	`style_id` int,
	`style_option_id` int,
	`style_type` tinyint,
	CONSTRAINT `product_styles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `style_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`type` tinyint DEFAULT 1,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `style_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `style_options` (
	`id` int AUTO_INCREMENT NOT NULL,
	`category_id` int,
	`name` varchar(100),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `style_options_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `businesses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`address` varchar(255) NOT NULL,
	`logo` varchar(255),
	`owner_id` int,
	`status` tinyint NOT NULL DEFAULT 1,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `businesses_id` PRIMARY KEY(`id`),
	CONSTRAINT `businesses_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
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
	`created_by` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_by` int,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `stores_id` PRIMARY KEY(`id`),
	CONSTRAINT `stores_phone_unique` UNIQUE(`phone`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`business_id` int NOT NULL,
	`plan_id` int NOT NULL,
	`plan_price` double NOT NULL,
	`payment_method` tinyint NOT NULL,
	`payment_status` tinyint NOT NULL,
	`start_date` datetime DEFAULT null,
	`end_date` datetime DEFAULT null,
	`trial_end_date` datetime DEFAULT null,
	`is_active` boolean DEFAULT true,
	`created_by` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_by` int,
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`business_id` int NOT NULL,
	`store_id` int,
	`name` varchar(200) NOT NULL,
	`phone` varchar(20) NOT NULL,
	`email` varchar(250),
	`type` tinyint NOT NULL,
	`password` text NOT NULL,
	`profile_picture` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_phone_unique` UNIQUE(`phone`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_images` ADD CONSTRAINT `order_images_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_images` ADD CONSTRAINT `order_images_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_measurements` ADD CONSTRAINT `order_measurements_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_measurements` ADD CONSTRAINT `order_measurements_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_measurements` ADD CONSTRAINT `order_measurements_category_id_measurement_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `measurement_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_customer_id_customers_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_payment_method_id_payment_methods_id_fk` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_order_status_status_id_fk` FOREIGN KEY (`order_status`) REFERENCES `status`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_status_status_id_fk` FOREIGN KEY (`status`) REFERENCES `status`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_updated_by_users_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_styles` ADD CONSTRAINT `order_styles_order_id_orders_id_fk` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_styles` ADD CONSTRAINT `order_styles_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_styles` ADD CONSTRAINT `order_styles_style_id_style_categories_id_fk` FOREIGN KEY (`style_id`) REFERENCES `style_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_styles` ADD CONSTRAINT `order_styles_style_option_id_style_options_id_fk` FOREIGN KEY (`style_option_id`) REFERENCES `style_options`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `measurement_categories` ADD CONSTRAINT `measurement_categories_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `measurement_categories` ADD CONSTRAINT `measurement_categories_updated_by_users_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_measurements` ADD CONSTRAINT `product_measurements_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_measurements` ADD CONSTRAINT `product_measurements_category_id_measurement_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `measurement_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_business_id_businesses_id_fk` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_updated_by_users_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_styles` ADD CONSTRAINT `product_styles_product_id_products_id_fk` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_styles` ADD CONSTRAINT `product_styles_style_id_style_categories_id_fk` FOREIGN KEY (`style_id`) REFERENCES `style_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product_styles` ADD CONSTRAINT `product_styles_style_option_id_style_options_id_fk` FOREIGN KEY (`style_option_id`) REFERENCES `style_options`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `style_options` ADD CONSTRAINT `style_options_category_id_style_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `style_categories`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `businesses` ADD CONSTRAINT `businesses_owner_id_users_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `payments` ADD CONSTRAINT `payments_subscription_id_subscriptions_id_fk` FOREIGN KEY (`subscription_id`) REFERENCES `subscriptions`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stores` ADD CONSTRAINT `stores_business_id_businesses_id_fk` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stores` ADD CONSTRAINT `stores_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `stores` ADD CONSTRAINT `stores_updated_by_users_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_business_id_businesses_id_fk` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_plan_id_plans_id_fk` FOREIGN KEY (`plan_id`) REFERENCES `plans`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_created_by_users_id_fk` FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_updated_by_users_id_fk` FOREIGN KEY (`updated_by`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_business_id_businesses_id_fk` FOREIGN KEY (`business_id`) REFERENCES `businesses`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_store_id_stores_id_fk` FOREIGN KEY (`store_id`) REFERENCES `stores`(`id`) ON DELETE no action ON UPDATE no action;