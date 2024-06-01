import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm"

enum Role {
  ADMIN = "ADMIN",
  MEDECIN = "MEDECIN",
  COLLABORATEUR = "COLLABORATEUR",
}

@Entity()
class User extends BaseEntity {
  @Column({
    type: "bigint",
    primary: true,
    generated: true,
  })
  id: number

  @Column()
  matricule: string

  @Column()
  nom: string

  @Column()
  motdepasse: string

  @Column({
    type: "enum",
    enum: Role,
    default: null,
    nullable: true,
  })
  role: Role
}

export default User
