import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Registration {
    country: string;
    name: string;
    email: string;
    phone: string;
    confirmed: boolean;
}
export interface backendInterface {
    getAllRegistrations(): Promise<Array<Registration>>;
    getRemainingSeats(): Promise<bigint>;
    isEmailRegistered(email: string): Promise<boolean>;
    register(name: string, email: string, phone: string, country: string): Promise<void>;
}
