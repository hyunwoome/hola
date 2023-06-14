import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountProfileTable1686553426960
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE account_profile
        (
            id           INTEGER AUTO_INCREMENT PRIMARY KEY,
            account_type VARCHAR(10)  NOT NULL,
            nickname     VARCHAR(30)  NOT NULL,
            custom_email VARCHAR(50)  NOT NULL,
            language     VARCHAR(300) NULL,
            position     VARCHAR(30)  NULL,
            affiliation  VARCHAR(30)  NULL,
            github_url   VARCHAR(200) NULL,
            blog_url     VARCHAR(200) NULL,
            about_me     TEXT         NULL,
            create_date  TIMESTAMP    NOT NULL,
            update_date  TIMESTAMP    NULL,
            delete_date  TIMESTAMP    NULL
        );
        `,
    );
  }

  public async down(): Promise<void> {
    throw new Error('not support function');
  }
}
