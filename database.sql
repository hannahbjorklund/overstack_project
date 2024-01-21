CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"username" VARCHAR(80) UNIQUE NOT NULL,
	"password" VARCHAR(1000) NOT NULL,
	"created_at" TIMESTAMPTZ DEFAULT NOW(),
	"last_online" TIMESTAMPTZ DEFAULT NOW(),
	"is_admin" BOOLEAN DEFAULT FALSE
);
	
CREATE TABLE "blizzard_accounts" (
	"id" SERIAL PRIMARY KEY,
	"battletag" VARCHAR(80),
	"user_id" int REFERENCES "users"
);
	
CREATE TABLE "user_accounts" (
	"id" SERIAL PRIMARY KEY,
	"blizzard_account_id" integer NOT NULL REFERENCES "blizzard_accounts",
    "user_id" integer REFERENCES "users"
);

-- Join to show all users and their battletags
SELECT "username",
	"battletag"
	FROM "users"
	JOIN "user_accounts"
	ON "users"."id" = "user_accounts"."user_id"
	JOIN "blizzard_accounts"
	ON "blizzard_accounts"."id" = "user_accounts"."blizzard_account_id";

-- Show all of a user's added accounts that they DONT own (friends)
SELECT "battletag"
	FROM "user_accounts"
	JOIN "blizzard_accounts"
	ON
	"user_accounts"."blizzard_account_id" = "blizzard_accounts"."id"
	JOIN "users"
	ON
	"users"."id" = "blizzard_accounts"."user_id"
	WHERE "user_accounts"."user_id" IS NULL;