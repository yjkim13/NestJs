import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { BoardStatus } from "./board-status.enum";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn() //id 열이 Board 엔티티의 기본 키 열임을 뜻함
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: BoardStatus;

    @ManyToOne(type => User, user => user.boards, { eager: false })
    user: User
}