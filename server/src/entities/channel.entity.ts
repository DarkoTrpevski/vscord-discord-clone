import { Exclude, classToPlain } from "class-transformer";
import { Entity, Column, CreateDateColumn, OneToMany, JoinColumn, ManyToOne, BeforeUpdate } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { Message } from "./message.entity";
import { Server } from "./server.entity";

@Entity('channels')
export class Channel extends AbstractEntity {

  @Column()
  name: string;

  @OneToMany(() => Message, message => message.ownerChannel, { onDelete: 'CASCADE' })
  @JoinColumn()
  channelMessages: Message[];

  @ManyToOne(type => Server,  server => server.serverChannels)
  ownerServer: Server
  
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateUpdated: Date;

  @BeforeUpdate()
  updateTimeStamp() {
    this.dateUpdated = new Date();
  }
  
  toJSON() {
    return classToPlain(this);
  }

}