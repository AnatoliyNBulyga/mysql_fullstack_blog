import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../users/users.entity';

interface PostCreationAttrs {
  title: string;
  desc: string;
  img?: string;
  date: string;
  cat: string;
  uid: number;
}

@Table({ tableName: 'posts', createdAt: false, updatedAt: false })
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  desc: string;

  @Column({ type: DataType.STRING })
  img: string;

  @Column({ type: DataType.DATE, allowNull: false })
  date: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  uid: number;

  @Column({ type: DataType.STRING, allowNull: false })
  cat: string;
}
