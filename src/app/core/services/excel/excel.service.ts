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

    async createNewExcelFile(path: string, rows: Array<any>): Promise<boolean> {
        // A new Excel Work Book
        const workbook = new this.electronService.ExcelJS.Workbook();

        // Some information about the Excel Work Book.
        workbook.creator = 'SWEVID Excel parser';
        workbook.lastModifiedBy = '';
        workbook.created = new Date();
        workbook.modified = new Date();

        // Create a sheet
        const sheet = workbook.addWorksheet('Sheet1');

        // A table header
        sheet.columns = Object.keys(rows[0]).map(row => {
            return { header: row, key: row }
        });

        // Add rows in the above header
        rows.forEach(row => {
            sheet.addRow(row)
        });

        //Automatically set column width
        sheet.columns.forEach(column => {
            column.width = column.header.length < 12 ? 12 : column.header.length
        });

        // Save Excel on Hard Disk
        try {
            await workbook.xlsx.writeFile(path);
        } catch (e) {
            console.log(e);
            return false;
        }

        return true;
    }
}
