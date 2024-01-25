import { Column, Timestamp, UpdateDateColumn } from "typeorm";


export enum UpdOperation {
    inserted= 0,
    updated= 1,
    deleted =2
}
export class BaseEntity {

        
    @UpdateDateColumn()
    updDate:Date
    
    @Column({type:'enum',enum:UpdOperation, default:UpdOperation.inserted})
    updOperation: number

    @Column({default:1})
    createdBy:number
}