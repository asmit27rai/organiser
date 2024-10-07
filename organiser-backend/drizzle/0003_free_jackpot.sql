CREATE TABLE `exercise_set` (
	`id` text PRIMARY KEY NOT NULL,
	`plan_exercise_id` text NOT NULL,
	`set_number` integer NOT NULL,
	`reps` integer NOT NULL,
	`reps_done` integer NOT NULL,
	FOREIGN KEY (`plan_exercise_id`) REFERENCES `plan_exercise`(`id`) ON UPDATE no action ON DELETE no action
);
