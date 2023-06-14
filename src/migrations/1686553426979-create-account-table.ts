import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccountTable1686553426979 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE account
        (
            id                 INTEGER AUTO_INCREMENT PRIMARY KEY,
            account_profile_id INTEGER,
            email              VARCHAR(50) NOT NULL,
            login_type         VARCHAR(20) NOT NULL,
            create_date        TIMESTAMP   NOT NULL,
            delete_date        TIMESTAMP   NULL,
            FOREIGN KEY (account_profile_id) REFERENCES account_profile (id)
        );
      `);
  }

  public async down(): Promise<void> {
    throw new Error('not support function');
  }
}
