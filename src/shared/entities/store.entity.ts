import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'store' })
export class Store {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id?: string;

  @ApiProperty()
  @Column({
    name: 'name',
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  name: string;

  @ApiProperty()
  @Column({
    name: 'logo',
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  logo?: string;

  @ApiProperty()
  @Column({
    name: 'plan',
    type: 'varchar',
    length: 15,
  })
  plan?: string;

  @ApiProperty()
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt?: Date;

  @ApiProperty()
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: false,
  })
  updatedAt?: Date;
}
