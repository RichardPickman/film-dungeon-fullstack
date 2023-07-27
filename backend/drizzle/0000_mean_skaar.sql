CREATE TABLE IF NOT EXISTS "dungeon" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "game" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "monster" (
	"id" serial PRIMARY KEY NOT NULL,
	"hp" integer,
	"name" varchar(256),
	"image" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(64),
	"question" varchar(256),
	"image" varchar(256),
	"answers" json,
	"letters" json,
	"numbers" json
);
