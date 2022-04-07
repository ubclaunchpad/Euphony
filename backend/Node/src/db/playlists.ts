import { client } from '../index';

export const insertPlaylist = async (playlistData: any) => {
	try {
		const insertPlaylist = await client.query(
			`
			INSERT INTO "euphonyPlaylists" ("playlistId", "userId")
			VALUES ($1, $2);
    `,
			[playlistData.id, playlistData.owner.id]
		);

		if (insertPlaylist.rowCount === 1) {
			return true;
		}

		return false;
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const getUserEuphonyPlaylists = async (userId: string) => {
	try {
		const getUserEuphonyPlaylists = await client.query(
			`
			SELECT * FROM "euphonyPlaylists"
			WHERE "euphonyPlaylists"."userId" = $1;
    `,
			[userId]
		);

		if (getUserEuphonyPlaylists) return getUserEuphonyPlaylists.rows;

		return false;
	} catch (e) {
		console.log(e);
		return false;
	}
};

export const removeUserEuphonyPlaylistFromPg = async (
	playlistId: string,
	userId: string
) => {
	try {
		const removeUserEuphonyPlaylist = await client.query(
			`
			DELETE FROM "euphonyPlaylists"
			WHERE "euphonyPlaylists"."playlistId" = $1 AND "euphonyPlaylists"."userId" = $2;
    `,
			[playlistId, userId]
		);

		if (removeUserEuphonyPlaylist) return true;

		return false;
	} catch (e) {
		console.log(e);
		return false;
	}
};
