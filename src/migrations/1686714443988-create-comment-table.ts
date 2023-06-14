import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCommentTable1686714443988 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE comment
        (
            id          INTEGER AUTO_INCREMENT PRIMARY KEY,
            study_id    INTEGER   NOT NULL,
            comment_id  INTEGER   NULL,
            account_id  INTEGER   NOT NULL,
            description TEXT      NOT NULL,
            create_date TIMESTAMP NOT NULL,
            update_date TIMESTAMP NULL,
            delete_date TIMESTAMP NULL,
            FOREIGN KEY (study_id) REFERENCES study (id),
            FOREIGN KEY (comment_id) REFERENCES comment (id),
            FOREIGN KEY (account_id) REFERENCES account (id)
        );
    `);
  }

  public async down(): Promise<void> {
    throw new Error('not support function');
  }
}
