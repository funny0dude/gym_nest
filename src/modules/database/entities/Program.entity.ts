import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ClientProgram } from "./ClientProgram.entity";

@Entity({ name: "public.program" })
export class Program {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  room_code!: string;

  @OneToMany(() => ClientProgram, (clientProgram) => clientProgram.program)
  clientPrograms!: ClientProgram[];
}