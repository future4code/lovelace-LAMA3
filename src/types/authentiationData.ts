export type authenticationData = { id: string, userRoles:roles }

export enum roles {
    ADMIN = "admin",
    NORMAL = "normal"
}