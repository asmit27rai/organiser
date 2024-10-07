CREATE TABLE `exercise` (
	`id` text PRIMARY KEY NOT NULL,
	`exercise_name` text NOT NULL,
	`duration` integer,
	`type` text
);
--> statement-breakpoint
CREATE TABLE `fitness_plan` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`plan_name` text NOT NULL,
	`start_date` integer DEFAULT (current_timestamp) NOT NULL,
	`end_date` integer DEFAULT (current_timestamp) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `plan_exercise` (
	`id` text PRIMARY KEY NOT NULL,
	`plan_id` text NOT NULL,
	`exercise_id` text NOT NULL,
	`day` text NOT NULL,
	FOREIGN KEY (`plan_id`) REFERENCES `fitness_plan`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE no action
);
