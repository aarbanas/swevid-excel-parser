import { ElectronService } from "../electron/electron.service";
import { Injectable } from "@angular/core";
import * as Datastore from 'nedb';

@Injectable()
export class DatabaseService {

    constructor(private electronService: ElectronService) {
    }

    public create(database: string, item: any): Promise<number> {
        return new Promise((resolve, reject) => {
            const userDataPath = this.electronService.app.getPath('userData');
            const db: Datastore = new Datastore({ filename: userDataPath + `/${ database }.db`, autoload: true });

            return db.insert(item, ((err: any, res: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }));
        });
    }

    public update(database: string, query: any, data: any, multi: boolean): Promise<number> {
        return new Promise((resolve, reject) => {
            const userDataPath = this.electronService.app.getPath('userData');
            const db: Datastore = new Datastore({ filename: userDataPath + `/${ database }.db`, autoload: true });

            return db.update(query, data, { multi: multi }, ((err: any, res: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }));
        });
    }

    public findOne(database: string, query: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const userDataPath = this.electronService.app.getPath('userData');
            const db: Datastore = new Datastore({ filename: userDataPath + `/${ database }.db`, autoload: true });
            return db.findOne(query, ((err: any, items: Array<any>) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(items);
                }
            }));
        });
    }

    public remove(database: string, query: any, multi: boolean): Promise<number> {
        return new Promise((resolve, reject) => {
            const userDataPath = this.electronService.app.getPath('userData');
            const db: Datastore = new Datastore({ filename: userDataPath + `/${ database }.db`, autoload: true });
            return db.remove(query, { multi: multi }, ((err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            }));
        });
    }
}
