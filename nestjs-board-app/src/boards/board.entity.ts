import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { BoardStatus } from "./board.model";

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
}