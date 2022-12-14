import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export default class UserEntity {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  readonly id: number = 1;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ nullable: true })
  internal: string;

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  readonly password: string = '';

  @ApiProperty({ type: String, maxLength: 64 })
  @Column({ length: 64 })
  @Index({ unique: true })
  readonly email: string = '';

  @Column()
  @Index({ unique: true })
  username: string;

  @ApiProperty({ type: Boolean })
  @Column()
  readonly verified: boolean = false;
}
