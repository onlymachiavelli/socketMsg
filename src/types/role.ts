export enum Permission {
  ADMIN_READ = "ADMIN_READ",
  ADMIN_UPDATE = "ADMIN_UPDATE",
  ADMIN_DELETE = "ADMIN_DELETE",
  ADMIN_CREATE = "ADMIN_CREATE",
  MEDECIN_READ = "MEDECIN_READ",
  MEDECIN_UPDATE = "MEDECIN_UPDATE",
  MEDECIN_DELETE = "MEDECIN_DELETE",
  MEDECIN_CREATE = "MEDECIN_CREATE",
}

export enum Role {
  COLLABORATEUR = "COLLABORATEUR",
  USER = "USER",
  ADMIN = "ADMIN",
  MEDECIN = "MEDECIN",
}

export class RoleHelper {
  static permissions = {
    [Role.COLLABORATEUR]: new Set<Permission>([]),
    [Role.USER]: new Set<Permission>([]),
    [Role.ADMIN]: new Set<Permission>([
      Permission.ADMIN_READ,
      Permission.ADMIN_UPDATE,
      Permission.ADMIN_DELETE,
      Permission.ADMIN_CREATE,
      Permission.MEDECIN_READ,
      Permission.MEDECIN_UPDATE,
      Permission.MEDECIN_DELETE,
      Permission.MEDECIN_CREATE,
    ]),
    [Role.MEDECIN]: new Set<Permission>([
      Permission.MEDECIN_READ,
      Permission.MEDECIN_UPDATE,
      Permission.MEDECIN_DELETE,
      Permission.MEDECIN_CREATE,
    ]),
  }

  static getAuthorities(role: Role): string[] {
    const authorities = Array.from(this.permissions[role]).map(
      (permission) => `PERMISSION_${permission}`
    )
    authorities.push(`ROLE_${role}`)
    return authorities
  }
}
