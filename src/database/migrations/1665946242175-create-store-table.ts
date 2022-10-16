import { MigrationInterface, QueryRunner } from 'typeorm';

export class createStoreTable1665946242175 implements MigrationInterface {
  name = 'createStoreTable1665946242175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE app_user (
            id uuid PRIMARY KEY ,
            name varchar(50),
            email varchar(50) unique,
            password varchar(255),
            image varchar(100),
            store_id uuid,
            created_at timestamp NOT NULL DEFAULT  CURRENT_TIMESTAMP,
            updated_at timestamp NOT NULL DEFAULT   CURRENT_TIMESTAMP
        );`);

    await queryRunner.query(`CREATE TABLE  store (
        id uuid PRIMARY KEY,
      name varchar(75) NOT NUll unique,
      owner_id uuid NOT NULL,
      cpnj varchar(14) unique,
      created_at timestamp NOT NULL DEFAULT  CURRENT_TIMESTAMP,
      updated_at timestamp NOT NULL DEFAULT   CURRENT_TIMESTAMP
    );`);
    await queryRunner.query(
      `ALTER TABLE store ADD FOREIGN KEY (owner_id) REFERENCES app_user(id);`,
    );
    await queryRunner.query(`ALTER TABLE app_user ADD FOREIGN KEY (store_id) REFERENCES store(id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE app_user CASCADE`);
    await queryRunner.query(`DROP TABLE store CASCADE`);
  }
}
