CREATE TABLE `admin_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`last_login` integer,
	`is_active` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admin_users_username_unique` ON `admin_users` (`username`);
--> statement-breakpoint
CREATE TABLE `home_content` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`section` text NOT NULL,
	`title` text,
	`subtitle` text,
	`description` text,
	`content` text,
	`image` text,
	`icon` text,
	`order_index` integer DEFAULT 0 NOT NULL,
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `home_content_section_unique` ON `home_content` (`section`);
--> statement-breakpoint
CREATE TABLE `news` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`date` text NOT NULL,
	`category` text NOT NULL,
	`category_name` text NOT NULL,
	`image` text NOT NULL,
	`gradient` text DEFAULT 'from-transparent to-transparent' NOT NULL,
	`read_time` text NOT NULL,
	`author` text NOT NULL,
	`content` text NOT NULL,
	`tags` text,
	`featured` integer DEFAULT 0 NOT NULL,
	`gallery` text,
	`content_images` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`published` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`description` text NOT NULL,
	`icon` text DEFAULT '' NOT NULL,
	`image` text NOT NULL,
	`gradient` text DEFAULT 'from-transparent to-transparent' NOT NULL,
	`specifications` text NOT NULL,
	`applications` text NOT NULL,
	`brands` text NOT NULL,
	`detailed_description` text,
	`technical_specs` text,
	`gallery` text,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`published` integer DEFAULT 1 NOT NULL
);
