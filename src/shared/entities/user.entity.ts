import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 75,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  password?: string;

  @Column({
    name: 'image',
    type: 'varchar',
    length: 250,
    nullable: true,
  })
  image?: string;
}
