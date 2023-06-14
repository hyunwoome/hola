import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFavoriteTable1686714792127 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE favorite
        (
            id          INTEGER AUTO_INCREMENT PRIMARY KEY,
            study_id INTEGER NOT NULL ,
            account_id INTEGER NOT NULL ,
            is_favorite BOOLEAN NULL,
            create_date TIMESTAMP NOT NULL,
            update_date TIMESTAMP NULL,
            FOREIGN KEY (study_id) REFERENCES study (id),
            FOREIGN KEY (account_id) REFERENCES account (id)
        );
    `);
  }

  public async down(): Promise<void> {
    throw new Error('not support function');
  }
}
