import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: "./cell.picker.modal.component.html"
})
export class CellPickerModalComponent implements OnInit {

    @Input() jsonFile: any

    sheets: string[] = [];
    selectedSheet: string = "";
    selectedRow: number = 0;

    ObjectKeys = Object.keys;

    columns: string[] = [];
    selectedName: string = "";
    selectedSex: string = "";
    selectedYob: string = "";

    constructor(private activeModal: NgbActiveModal) {
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

    submit() {

    }

    close() {
        this.activeModal.close({ success: false });
    }
}
