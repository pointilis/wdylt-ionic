export class PostUpgradeStatements {
    postUpgrades: {toVersion: number, statements: string[]}[] = [
        {
            toVersion: 1,
            statements: [
                `CREATE TABLE IF NOT EXISTS posts(
                    ID                  INTEGER PRIMARY KEY AUTOINCREMENT,
                    post_author         TEXT NOT NULL, /* use user email */
                    post_date           NUMERIC NOT NULL DEFAULT '0000-00-00 00:00:00',
                    post_date_gmt       NUMERIC NOT NULL DEFAULT '0000-00-00 00:00:00',
                    post_content        TEXT NULL,
                    post_title          TEXT NULL,
                    post_excerpt        TEXT NULL,
                    post_status         TEXT NOT NULL DEFAULT 'draft',
                    post_modified       NUMERIC NOT NULL DEFAULT '0000-00-00 00:00:00',
                    post_modified_gmt   NUMERIC NOT NULL DEFAULT '0000-00-00 00:00:00',
                    post_parent         INTEGER NOT NULL DEFAULT 0,
                    post_type           TEXT NOT NULL DEFAULT 'post',
                    post_mime_type      TEXT NULL,
                    meta                TEXT NULL,
                    tags                TEXT NULL
                );`
            ]
        },
        /* add new statements below for next database version when required*/
    ]
}