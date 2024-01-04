import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../core/base.entity';
import { Role } from '../../roles/entities/role.entity';

@Entity('user')
export class User extends BaseEntity {
  @ManyToOne((type) => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column()
  role_id: number;

  @Column()
  username: string;

  @Column()
  fullname: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'created_by' })
  creator: User;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'updated_by' })
  updater: User;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'deleted_by' })
  deleter: User;
}
