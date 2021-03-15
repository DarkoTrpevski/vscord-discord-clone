import { Exclude, classToPlain } from "class-transformer";
import { Entity, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany, BeforeUpdate } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import { Channel } from "./channel.entity";
import { User } from "./user.entity";

@Entity('servers')
export class Server extends AbstractEntity {

  @Column('varchar')
  name: string;

  @Column('boolean')
  isPrivate: boolean;

  @Column({ type: 'varchar', nullable: true })
  photo: string;

  @Column({ type: 'varchar' })
  color: string;

  
  // @ManyToOne(() => User,  user => user.servers, { eager: true })
  @ManyToOne(() => User,  user => user.servers)
  owner: User

  @OneToMany(() => User, user => user.server)
  @JoinColumn()
  members: User[];

  @OneToMany(() => Channel, channels => channels.ownerServer, { eager: true })
  @JoinColumn()
  serverChannels: Channel[];

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