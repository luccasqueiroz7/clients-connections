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
