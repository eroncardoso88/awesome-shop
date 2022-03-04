import { Column, BaseEntity, PrimaryGeneratedColumn, Entity } from 'typeorm'

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column()
    platformRelated: string;

    @Column()
    platformRelatedPosition: string;
}