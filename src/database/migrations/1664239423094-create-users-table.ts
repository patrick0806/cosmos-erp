import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUsersTable1664239423094 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE users (
        name varchar(50),
        email varchar(50) unique,
        password varchar(255),
        image varchar(100)
    );`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users`);
  }
}
