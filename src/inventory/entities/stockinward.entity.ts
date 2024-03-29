import { BaseEntity } from "../../base"
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Supplier } from "./supplier.entity";
import { ProductVariant } from "../../product/entities/productvariant.entity";


@Entity('stockinward')
export class StockInward extends BaseEntity{
    @PrimaryGeneratedColumn('identity')
    id:number
    @Column({type:'integer',name:'stock'})
    stock:number
    @ManyToOne(()=>Supplier,supplier=>supplier.stockInwards)
    supplier:Supplier
    @ManyToOne(()=>ProductVariant,productVariant=>productVariant.stockInwards)
    productVariant:ProductVariant

}