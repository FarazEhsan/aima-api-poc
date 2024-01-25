import { BaseEntity } from "src/base";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { ProductUnit } from "src/enums";
import { StockInward } from "src/inventory/entities/stockinward.entity";
import { Sales } from "src/inventory/entities/sale.entity";



@Entity('productvariant')
export class ProductVariant extends BaseEntity{
    @PrimaryGeneratedColumn('identity')
    id:number
    @ManyToOne(()=>Product,product=>product.variants)
    product:Product
    @Column({type:'enum', enum:ProductUnit})
    unit:string 
    @Column({name:'currentstock'})
    currentStock:number
    @Column({name:'minimumstock'})
    minimumStock:number
    @OneToMany(()=>StockInward,stockInward=>stockInward.productVariant)
    stockInwards: StockInward[]
    @OneToMany(()=>Sales,sale=>sale.productVariant)
    sales: Sales[]
}