import { ElectronService } from "../electron/electron.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ExcelService {

    constructor(private electronService: ElectronService) {
    }

    convertToJSON(file: File): any {
        return this.electronService.excelToJson({
            sourceFile: file.path
        });

    }
}
