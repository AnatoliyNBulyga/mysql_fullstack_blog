import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../users/users.entity';

interface PostCreationAttrs {
  title: string;
  desc: string;
  img?: string;
  cat: string;
  uid: number;
}

@Table({ tableName: 'posts' })
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
  img: string | null;

  @Column({ type: DataType.STRING, allowNull: false })
  cat: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  uid: number;

  @BelongsTo(() => User)
  author: User;
}
