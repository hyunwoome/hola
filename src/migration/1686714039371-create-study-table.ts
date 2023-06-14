import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStudyTable1686714039371 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE study
        (
            id              INTEGER AUTO_INCREMENT PRIMARY KEY,
            account_id      INTEGER      NOT NULL,
            title           VARCHAR(100) NOT NULL,
            description     TEXT         NOT NULL,
            study_type      VARCHAR(50)  NOT NULL,
            language        VARCHAR(300) NOT NULL,
            recruit_number  INTEGER      NOT NULL,
            location_type   VARCHAR(50)  NOT NULL,
            contact_type    VARCHAR(50)  NOT NULL,
            contact_link    VARCHAR(100) NOT NULL,
            tag             VARCHAR(300) NOT NULL,
            expected_period VARCHAR(10)  NOT NULL,
            create_date     TIMESTAMP    NOT NULL,
            update_date     TIMESTAMP    NULL,
            delete_date     TIMESTAMP    NULL,
            FOREIGN KEY (account_id) REFERENCES account (id)
        );
    `);
  }

  public async down(): Promise<void> {
    throw new Error('not support function');
  }
}
