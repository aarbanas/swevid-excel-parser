import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    templateUrl: "./cell.picker.modal.component.html"
})
export class CellPickerModalComponent implements OnInit {

    constructor(private activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
    }

    close() {
        this.activeModal.close({ success: false });
    }
}
