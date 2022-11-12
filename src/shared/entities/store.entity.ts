import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'store' })
export class Store {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  name: string;

  @Column({
    name: 'logo',
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  logo: string;

  @Column({
    name: 'plan',
    type: 'varchar',
    length: 15,
  })
  plan?: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt?: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
  })
  updatedAt?: string;
}
