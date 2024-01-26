import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../base';
import { ProductCategory } from './productcategory.entity';
import { ProductVariant } from './productvariant.entity';

@Entity('product')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column({ type: 'varchar', length: 100, name: 'productname' })
  productName: string;

  @Column({ type: 'varchar', length: 100, name: 'productdescription' })
  productDescription: string;

  @ManyToOne(() => ProductCategory, productCategory => productCategory.products)
  category:ProductCategory

  @OneToMany(()=> ProductVariant, productVariant => productVariant.product)
  variants:ProductVariant[]
}
