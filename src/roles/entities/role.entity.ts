import { BaseEntity } from '../../../core/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('role')
export class Role extends BaseEntity {
  @Column()
  code: string;

  @Column()
  name: string;

  @ManyToOne((type) => User, { eager: true })
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @ManyToOne((type) => User, { eager: true })
  @JoinColumn({ name: 'updated_by' })
  updater: User;

  @ManyToOne((type) => User, { eager: true })
  @JoinColumn({ name: 'deleted_by' })
  deleter: User;
}
