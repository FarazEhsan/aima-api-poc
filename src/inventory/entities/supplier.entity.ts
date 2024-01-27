import { BaseEntity } from "../../base"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StockInward } from "./stockinward.entity";


@Entity('supplier')
export class Supplier extends BaseEntity {
    @PrimaryGeneratedColumn('identity')
    id: number;
    @Column({ type: 'varchar', length: 100, name: 'suppliername' })
    name: string;
    @Column({ type: 'varchar', length: 100, name: 'supplieraddress' })
    address: string;
    @Column({ type: 'varchar', length: 100, name: 'supplierphone' })
    phone: string;
    @Column({ type: 'varchar', length: 100, name: 'supplieremail' })
    email: string;
    @Column({ type: 'varchar', length: 100, name: 'suppliercontactperson' })
    contactPerson: string;
    @Column({ type: 'varchar', length: 100, name: 'suppliercontactpersonphone' })
    contactPersonPhone: string;
    @OneToMany(() => StockInward, stockInward => stockInward.supplier)
    stockInwards: StockInward[]
}