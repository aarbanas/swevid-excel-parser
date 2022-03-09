import { Component, NgZone, OnInit } from '@angular/core';
import { ExcelService } from "../core/services/excel/excel.service";
import { ElectronService } from "../core/services";
import { DatabaseService } from "../core/services/database/database.service";
import { Result } from "../../interface/Result";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    swevidPath: string = "";

    constructor(private excelService: ExcelService,
                private electronService: ElectronService,
                private databaseService: DatabaseService) {
    }

    async ngOnInit(): Promise<void> {
        await this.getSwevidPath();
    }

    async getSwevidPath(): Promise<Result<string>> {
        const config = await this.databaseService.findOne("configurations", { key: "swevid-path" });
        if (!config)
            return;

        this.swevidPath = config.options.path;
        console.log(config);
    }

    onFileAdd(file: File) {
        const jsonFile = this.excelService.convertToJSON(file);

    }

    async onFolderPick() {
        const path = await this.electronService.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] });
        if (path.canceled)
            return;

        const config = await this.databaseService.findOne("configurations", { key: "swevid-path" });
        if (!config) {
            await this.databaseService.create("configurations", { key: "swevid-path", options: { path: path.filePaths[0] } });
            window.location.reload();
            return;
        }

        await this.databaseService.update("configurations", { key: "swevid-path" }, { key: "swevid-path", options: { path: path.filePaths[0] } }, false);
    }
}
