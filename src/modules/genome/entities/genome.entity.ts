import { BaseEntity, Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm'
import { GenomeType } from '../enums'

@Entity('genomes')
export class Genome extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;;

  @Column({ type: 'text', nullable: true })
  dna: string;

  @Column({ type: "enum", enum: GenomeType, nullable: true })
  type: GenomeType;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;
}