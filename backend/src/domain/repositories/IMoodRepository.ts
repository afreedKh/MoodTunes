import { ISong, Mood } from "../entities/Mood";

export interface IMoodRepository {
    create(mood:Mood):Promise<Mood>;
    findAll():Promise<Mood[]>;
    findById(id:string):Promise<Mood | null>;
    update(id:string,data: { name?: string; songs?: ISong[] }):Promise<Mood | null>;
    delete(id:string):Promise<void>;
}