import { Component, Input, OnInit } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  templateUrl: './invalid.cell.modal.component.html',
  styleUrls: ['./invalid.cell.modal.component.scss']
})
export class InvalidCellModalComponent {

  @Input() name: string
  @Input() birthDate: string
  @Input() validationObject: { name: boolean, birthDate: boolean }

  constructor (private activeModal: NgbActiveModal) {
  }

  submit() {
    this.activeModal.close( {
      success: true,
      data: {
        name: this.name,
        birthDate: this.birthDate
      }
    })
  }

  close() {
    this.activeModal.close({ success: false })
  }


}
