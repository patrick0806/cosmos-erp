import { MigrationInterface, QueryRunner } from 'typeorm';

export class createDefaultDatabase1668285283926 implements MigrationInterface {
  name = 'createDefaultDatabase1668285283926';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE store (
          id SERIAL PRIMARY KEY NOT NULL,
          name varchar(70) UNIQUE NOT NULL,
          logo varchar(70),
          plan varchar(15),
          created_at timestamp DEFAULT now(),
          updated_at timestamp DEFAULT now()
        );`);
    await queryRunner.query(`
        CREATE TABLE seller_responsibility(
            id SERIAL PRIMARY KEY NOT NULL,
            description varchar(20),
            created_at timestamp DEFAULT now(),
            updated_at timestamp DEFAULT now()
        );
        `);
    await queryRunner.query(`
        CREATE TABLE seller(
         id SERIAL PRIMARY KEY NOT NULL,
         store_id int NOT NULL,
         name varchar NOT NULL,
         email varchar NOT NULL,
         password varchar NOT NULL,
         responsibility_id int NOT NULL,
         created_at timestamp DEFAULT now(),
         updated_at timestamp DEFAULT now(),
         
         CONSTRAINT fk_seller_store 
             FOREIGN KEY (store_id) 
             REFERENCES store(id),
         
         CONSTRAINT fk_seller_responsibility
             FOREIGN KEY (responsibility_id) 
             REFERENCES seller_responsibility(id)
       );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE seller CASCADE`);
    await queryRunner.query(`DROP TABLE store`);
    await queryRunner.query(`DROP TABLE seller_responsibility`);
  }
}
