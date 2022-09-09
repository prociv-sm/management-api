import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Sector extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string & { __brand: 'sectorId' };

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @Column()
  created_at: Date;
}
