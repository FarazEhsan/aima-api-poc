import { BaseEntity } from "src/base"
import { ProductVariant } from "src/product/entities/productvariant.entity"
import { AfterInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity('sale')
export class Sales extends BaseEntity {
    @PrimaryGeneratedColumn('identity')
    id:string
    @ManyToOne(()=>ProductVariant,productVariant=>productVariant.sales)
    productVariant:ProductVariant
    @Column({type:'number'})
    quantity:number
}