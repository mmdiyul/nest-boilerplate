import { BaseEntity } from '../../../core/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('file')
export class File extends BaseEntity {
  @Column()
  filename: string;

  @Column()
  filetype: string;

  @Column({ type: 'float8' })
  filesize: number;

  @Column()
  category: string;

  @Column()
  uploader_ip: string;

  @Column()
  path: string;

  @Column()
  status: boolean;

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
