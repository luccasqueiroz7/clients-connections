import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./clients.entity";
import { Contact } from "./contacts.entity";

@Entity("emails")
export class Email {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 256 })
  email: string;

  @ManyToOne(() => Client, { nullable: true })
  client: Client;

  @ManyToOne(() => Contact, { nullable: true })
  contact: Contact;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
