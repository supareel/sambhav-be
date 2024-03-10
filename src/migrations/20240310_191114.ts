import { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from 'drizzle-orm'

export async function up({ payload }: MigrateUpArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

CREATE TABLE IF NOT EXISTS "centers" (
	"id" serial PRIMARY KEY NOT NULL,
	"location" varchar NOT NULL,
	"map_location" varchar NOT NULL,
	"inaugurated_at" varchar NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "batches" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"start_date" timestamp(3) with time zone NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"price" numeric NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "centers_created_at_idx" ON "centers" ("created_at");
CREATE INDEX IF NOT EXISTS "batches_created_at_idx" ON "batches" ("created_at");
CREATE INDEX IF NOT EXISTS "courses_created_at_idx" ON "courses" ("created_at");`);

};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
await payload.db.drizzle.execute(sql`

DROP TABLE "centers";
DROP TABLE "batches";
DROP TABLE "courses";`);

};
