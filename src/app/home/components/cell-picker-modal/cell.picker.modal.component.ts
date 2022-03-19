import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: "./cell.picker.modal.component.html"
})
export class CellPickerModalComponent implements OnInit {

    @Input() jsonFile: any

    sheets: string[] = [];
    selectedSheet: string = "";

    constructor(private activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.sheets = Object.keys(this.jsonFile);
    }

    onSelectSheet(sheet: string) {
        this.selectedSheet = sheet;
    }

    submit() {

    }

    close() {
        this.activeModal.close({ success: false });
    }
}
