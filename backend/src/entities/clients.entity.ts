import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Contact } from "./contacts.entity";
import { Email } from "./emails.entity";
import { Phone } from "./phones.entity";

@Entity("clients")
export class Client {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column({ length: 256 })
  name: string;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 124 })
  @Exclude()
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt: Date;

  @UpdateDateColumn({ type: "date" })
  updatedAt: Date;

  @OneToMany(() => Email, (email: Email) => email.client, {
    eager: true,
    onDelete: "CASCADE",
  })
  emails: Email[];

  @OneToMany(() => Phone, (phone: Phone) => phone.client, {
    eager: true,
    onDelete: "CASCADE",
  })
  phones: Phone[];

  @OneToMany(() => Contact, (contact: Contact) => contact.client, {
    eager: true,
    onDelete: "CASCADE",
  })
  contacts: Contact[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
