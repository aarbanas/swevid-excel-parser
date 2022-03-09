import { Component, NgZone, OnInit } from '@angular/core';
import { ExcelService } from "../core/services/excel/excel.service";
import { ElectronService } from "../core/services";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private excelService: ExcelService,
                private electronService: ElectronService,
                private ngZone: NgZone) {
    }

    ngOnInit() {
    }

    onFileAdd(file: File) {
        const jsonFile = this.excelService.convertToJSON(file);

        console.log(jsonFile);
    }

    onFolderPick() {

    }
}
