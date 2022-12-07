import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Client } from "./clients.entity";
import { Contact } from "./contacts.entity";

@Entity("phones")
export class Phone {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 14 })
  number: string;

  @ManyToOne(() => Client, (client) => client.emails, { nullable: true, onDelete: "CASCADE" })
  client: Client;

  @ManyToOne(() => Contact, (contact) => contact.emails, { nullable: true, onDelete: "CASCADE" })
  contact: Contact;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
