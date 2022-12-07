import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./clients.entity";
import { Email } from "./emails.entity";
import { Phone } from "./phones.entity";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 256 })
  name: string;

  @OneToMany(() => Email, (email: Email) => email.contact, {
    eager: true,
    onDelete: "CASCADE",
  })
  emails: Email[];

  @OneToMany(() => Phone, (phone: Phone) => phone.contact, {
    eager: true,
    onDelete: "CASCADE",
  })
  phones: Phone[];

  @ManyToOne(() => Client)
  client: Client;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
