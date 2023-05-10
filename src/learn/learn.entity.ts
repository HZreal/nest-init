/**
 * @author sizhong
 * @date 2023-05-09
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_user', { schema: 'public' })
export class User {
    @PrimaryGeneratedColumn({ name: 'id', type: 'integer' })
    id: number;

    @Column({ name: 'name' })
    name: string;
}
