import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ElectronService } from "../../../core/services";

@Component({
    templateUrl: "./cell.picker.modal.component.html"
})
export class CellPickerModalComponent implements OnInit {

    @Input() jsonFile: any;
    @Input() swevidPath: string;

    sheets: string[] = [];
    selectedSheet: string = "";
    selectedRow: number = 0;

    ObjectKeys = Object.keys;

    columns: string[] = [];
    selectedName: string = "";
    selectedSex: string = "";
    selectedYob: string = "";

    disciplinesFrom: string = "";
    disciplinesTo: string = "";
    disciplinesColumns: string[] = [];
    disciplines: any[] = [];

    constructor(private activeModal: NgbActiveModal,
                private electronService: ElectronService) {
    }

    ngOnInit(): void {
        this.sheets = Object.keys(this.jsonFile);
    }

    onSelectSheet(sheet: string) {
        this.selectedSheet = sheet;
        this.selectedRow = 0;
    }

    onRowSelected(index: number) {
        this.selectedRow = index;
        this.columns = Object.keys(this.jsonFile[this.selectedSheet][this.selectedRow - 2]);
    }

    async calculateDisciplinesColumns() {
        this.disciplinesColumns = this.columns.slice(this.columns.findIndex(c => c === this.disciplinesFrom), this.columns.findIndex(c => c === this.disciplinesTo) + 1);

        const orgBuffer = await this.readFile(this.swevidPath + "/Baza/Disciplina.DBF");
        if (!orgBuffer?.length)
            return;

        this.disciplines = this.electronService.parseDBF(orgBuffer);
    }

    private async readFile(path: string): Promise<Buffer> {
        return new Promise(resolve => {
            this.electronService.fs.readFile(path, null, (err, data) => {
                if (err) {
                    resolve(null);
                    return;
                }

                resolve(data);
            });
        });
    }

    submit() {

    }

    close() {
        this.activeModal.close({ success: false });
    }
}
