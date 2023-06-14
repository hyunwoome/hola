import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNoticeTable1686713770072 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE notice
        (
            id                   INTEGER AUTO_INCREMENT PRIMARY KEY,
            account_id           INTEGER      NOT NULL,
            generated_account_id INTEGER      NOT NULL,
            title                VARCHAR(100) NOT NULL,
            is_read              BOOLEAN      NOT NULL,
            notice_type          VARCHAR(30)  NOT NULL,
            create_date          TIMESTAMP    NOT NULL,
            update_date          TIMESTAMP    NULL,
            FOREIGN KEY (account_id) REFERENCES account (id),
            FOREIGN KEY (generated_account_id) REFERENCES account (id)
        );
    `);
  }

  public async down(): Promise<void> {
    throw new Error('not support function');
  }
}
