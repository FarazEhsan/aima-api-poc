import { BaseEntity } from "src/base";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { ProductUnit } from "src/enums";
import { StockInward } from "src/inverntory/entities/stockinward.entity";
import { Sales } from "src/inverntory/entities/sale.entity";


@Entity('productvariant')
export class ProductVariant extends BaseEntity{
    @PrimaryGeneratedColumn('identity')
    id:number
    @ManyToOne(()=>Product,product=>product.variants)
    product:Product
    @Column({type:'enum', enum:ProductUnit})
    unit:string 
    @Column({type:'number'})
    currentStock:number
    @Column({type:'number'})
    minimumStock:number
    @OneToMany(()=>StockInward,stockInward=>stockInward.productVariant)
    stockInwards: StockInward[]
    @OneToMany(()=>Sales,sale=>sale.productVariant)
    sales: Sales[]
}