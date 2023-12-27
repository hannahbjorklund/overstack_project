CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(80) UNIQUE NOT NULL,
	"password" VARCHAR(1000) NOT NULL,
	"created_at" TIMESTAMPTZ DEFAULT NOW(),
	"last_online" TIMESTAMPTZ DEFAULT NOW(),
	"is_admin" BOOLEAN DEFAULT FALSE
);

INSERT INTO "users"
	("username", "password")
	VALUES
	('hamah', 'TheG04t');
	
CREATE TABLE "blizzard_accounts" (
	"id" SERIAL PRIMARY KEY,
	"battletag" VARCHAR(80),
	"user_id" int REFERENCES "users"
);

INSERT INTO "blizzard_accounts" 
	("battletag", "user_id")
	VALUES
	('Hamah-11988', '1');
	
CREATE TABLE "user_accounts" (
	"id" SERIAL PRIMARY KEY,
	"blizzard_account_id" integer NOT NULL REFERENCES "blizzard_accounts",
    "user_id" integer NOT NULL REFERENCES "users"
);

INSERT INTO "user_accounts"
	("blizzard_account_id", "user_id")
	VALUES
	(1, 1);

-- Join to show all users and their battletags
SELECT "username",
	"battletag"
	FROM "users"
	JOIN "user_accounts"
	ON "users"."id" = "user_accounts"."user_id"
	JOIN "blizzard_accounts"
	ON "blizzard_accounts"."id" = "user_accounts"."blizzard_account_id";