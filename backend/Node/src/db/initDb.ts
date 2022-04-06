import { client } from '../index';

export const createTables = async () => {
	await client.query(
		`
			CREATE TABLE IF NOT EXISTS "cityWeather" (
				id SERIAL PRIMARY KEY,
				"cityName" varchar(255) NOT NULL UNIQUE,
				"weatherData" jsonb
			);
		`
	);

	await client.query(
		`
			CREATE TABLE IF NOT EXISTS "countries" (
				id SERIAL PRIMARY KEY,
				"countryName" varchar(255) NOT NULL UNIQUE,
				"countryData" jsonb
			);
		`
	);

	await client.query(
		`
			CREATE TABLE IF NOT EXISTS users (
				"userId" varchar(255) NOT NULL,
				lat varchar(255) NOT NULL,
				lon varchar(255) NOT NULL,
				"cityId" int NOT NULL,
				"countryId" int NOT NULL,
				"userSpotifyData" jsonb,

				PRIMARY KEY ("userId"),
				FOREIGN KEY ("cityId") REFERENCES "cityWeather"(id),
				FOREIGN KEY ("countryId") REFERENCES "countries"(id)
			);
		`
	);

	await client.query(
		`
			CREATE TABLE IF NOT EXISTS "euphonyPlaylists" (
				"playlistId" varchar(255) NOT NULL,
				"userId" varchar(255) NOT NULL,

				PRIMARY KEY ("playlistId"),
				FOREIGN KEY ("userId") REFERENCES users("userId")
			);
		`
	);

	await client.query(
		`
			CREATE TABLE IF NOT EXISTS "migrations" (
				id SERIAL PRIMARY KEY,
				"lastMigration" TIMESTAMPTZ
			);
		`
	);

	await client.query(
		`
			INSERT INTO "migrations" (id, "lastMigration")
			VALUES (1, '${new Date().toISOString()}')
			ON CONFLICT (id)
			DO UPDATE SET
			"lastMigration" = EXCLUDED."lastMigration";
		`
	);
};
