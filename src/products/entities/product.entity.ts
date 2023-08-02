import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryColumn()
  product_id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  slug: string;
}
