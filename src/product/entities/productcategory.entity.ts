import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { BaseEntity } from "src/base";

@Entity('productcategory')
export class ProductCategory extends BaseEntity{
    @PrimaryGeneratedColumn('identity')
    id: number;
    @Column({ type: 'varchar', length: 100, name: 'categoryname' })
    name:string;
    @Column({ type: 'varchar', length: 100, name: 'categorydescription' })
    description:string;

    @OneToMany(()=> Product, product => product.category)
    products:Product[];
}