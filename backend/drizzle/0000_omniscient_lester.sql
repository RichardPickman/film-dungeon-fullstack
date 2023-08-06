CREATE TABLE IF NOT EXISTS "dungeon" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" json,
	"name" varchar(256),
	"game_id" integer NOT NULL,
	"boss_id" integer
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
	"image" json,
	"dungeon_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "question" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(64),
	"question" varchar(256),
	"image" json,
	"answers" json,
	"letters" json,
	"numbers" json,
	"monster_id" integer NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dungeon" ADD CONSTRAINT "dungeon_game_id_game_id_fk" FOREIGN KEY ("game_id") REFERENCES "game"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dungeon" ADD CONSTRAINT "dungeon_boss_id_monster_id_fk" FOREIGN KEY ("boss_id") REFERENCES "monster"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
