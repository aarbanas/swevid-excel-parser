import { ElectronService } from '../electron/electron.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ExcelService {
  constructor(private electronService: ElectronService) { }

  convertToJSON(file: File): any {
    return this.electronService.excelToJson({
      sourceFile: file.path,
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
    sheet.columns = Object.keys(rows[0]).map((row) => {
      return { header: row, key: row };
    });

    // Add rows in the above header
    rows.forEach((row) => {
      sheet.addRow(row);
    });

    //Automatically set column width
    sheet.columns.forEach((column) => {
      column.width = column.header.length < 12 ? 12 : column.header.length;
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

  async appendToExistingFile(path: string, rows: Array<any>): Promise<boolean> {
    try {
      const workbook = new this.electronService.ExcelJS.Workbook();
      await workbook.xlsx.readFile(path);

      const sheet =
        workbook.worksheets.find((ws) => ws.state === 'visible') ??
        workbook.worksheets[0];

      // Object rows only write fields that match worksheet column `key`s.
      // readFile() does not set keys (unlike createNewExcelFile's sheet.columns),
      // so without this every appended row was empty on disk.
      this.bindColumnKeysFromHeaderRow(sheet, 1);

      let lastDataRow = 0;
      sheet.eachRow((_, rowNumber) => {
        lastDataRow = Math.max(lastDataRow, rowNumber);
      });

      for (const row of rows) {
        lastDataRow += 1;
        sheet.getRow(lastDataRow).values = row;
      }

      await workbook.xlsx.writeFile(path);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  /** Map row 1 header text to ExcelJS column keys so row.values = { KEY: v } works. */
  private bindColumnKeysFromHeaderRow(sheet: any, headerRowNumber: number): void {
    const headerRow = sheet.getRow(headerRowNumber);
    headerRow.eachCell((cell: { text: string }, colNumber: number) => {
      const key = String(cell.text ?? '').trim();
      if (key) {
        sheet.getColumn(colNumber).key = key;
      }
    });
  }
}
