import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class User {
  @PrimaryColumn()
  username: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  photo: string;
}
