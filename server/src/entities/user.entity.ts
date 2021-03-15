import { Exclude, classToPlain } from "class-transformer";
import * as bcrypt from 'bcryptjs';
import { IsEmail } from "class-validator";
import { Entity, Column, BeforeInsert, CreateDateColumn, OneToMany, JoinColumn, ManyToOne, BeforeUpdate } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { Message } from "./message.entity";
import { Server } from "./server.entity";

@Entity('users')
export class User extends AbstractEntity {

  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'text', nullable: true })
  image: string;

  // @OneToMany(() => Server, servers => servers.owner)
  @OneToMany(() => Server, servers => servers.owner, { eager: true })
  @JoinColumn()
  servers: Server[];

  @ManyToOne(() => Server, server => server.members)
  server: Server;


  // @OneToMany(() => Message, messages => messages.owner)
  @OneToMany(() => Message, messages => messages.owner, { eager: true })
  @JoinColumn()
  messages: Message[];

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateRegistered: Date;


  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date;


  @BeforeUpdate()
  updateTimeStamp() {
    this.dateUpdated = new Date();
  }
  
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  toJSON() {
    return classToPlain(this);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

}