import { Exclude, classToPlain } from "class-transformer";
import { Entity, Column, CreateDateColumn, ManyToOne } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { Channel } from "./channel.entity";
import { User } from "./user.entity";

@Entity('messages')
export class Message extends AbstractEntity {

  @Column()
  content: string;

  @Column({ default: false })
  edited: boolean;

  @ManyToOne(type => User,  user => user.messages)
  owner: User

  @ManyToOne(type => Channel,  channel => channel.channelMessages)
  ownerChannel: Channel
  
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dateCreated: Date;

  toJSON() {
    return classToPlain(this);
  }

}