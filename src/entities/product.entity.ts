import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export default class Product {
    @PrimaryGeneratedColumn('uuid')
    public id?: string;
  
    @Column()
    public name: string;
    
    @Column()
    public category: string;

    @Column()
    public price: number;

    @Column()
    public color: string;
  }
  