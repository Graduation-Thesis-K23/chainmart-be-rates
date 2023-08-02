import { BaseEntity } from "src/common/base.entity";
import { Product } from "src/products/entities/product.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity("rates")
export class Rate extends BaseEntity {
  @Column()
  order_id: string;

  @Column()
  username: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "username" })
  user: User;

  @Column()
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product;

  @Column({ nullable: true })
  comment: string;

  @Column()
  star: number;

  @Column({
    nullable: true,
    type: "text",
    array: true,
  })
  images: string[];
}
