import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ElectronService } from '../../../core/services';
import { DataParser } from '../parser/data.parser';

@Component({
  templateUrl: './cell.picker.modal.component.html',
})
export class CellPickerModalComponent implements OnInit {
  @Input() jsonFile: any;
  @Input() swevidPath: string;
  @Input() organisation: any;

  sheets: string[] = [];
  selectedSheet: string = '';
  selectedRow: number = 0;

  ObjectKeys = Object.keys;

  columns: string[] = [];
  selectedName: string = '';
  selectedSex: string = '';
  selectedYob: string = '';

  showSurname: boolean = false;
  selectedSurname: string = '';

  disciplinesFrom: string = '';
  disciplinesTo: string = '';
  disciplinesColumns: string[] = [];
  disciplines: any[] = [];

  disciplineCell: { [cell: string]: any } = {};

  promiseBtn: any;

  constructor(
    private activeModal: NgbActiveModal,
    private electronService: ElectronService,
    private dataParser: DataParser,
  ) {}

  ngOnInit(): void {
    this.sheets = Object.keys(this.jsonFile);
  }

  onSelectSheet(sheet: string) {
    this.selectedSheet = sheet;
    this.selectedRow = 0;
  }

  onRowSelected(index: number) {
    this.selectedRow = index;
    this.columns = Object.keys(
      this.jsonFile[this.selectedSheet][this.selectedRow - 2],
    );
  }

  async calculateDisciplinesColumns() {
    this.disciplinesColumns = this.columns.slice(
      this.columns.findIndex((c) => c === this.disciplinesFrom),
      this.columns.findIndex((c) => c === this.disciplinesTo) + 1,
    );

    const orgBuffer = await this.readFile(
      this.swevidPath + '/Baza/Disciplina.DBF',
    );
    if (!orgBuffer?.length) return;

    this.disciplines = this.electronService.parseDBF(orgBuffer);
  }

  addSurname() {
    this.showSurname = true;
  }

  submit() {
    this.promiseBtn = (async () => {
      this.selectedName = this.prettifyAndConcatName();
      try {
        const result = await this.dataParser.parse(
          this.jsonFile,
          this.selectedSheet,
          this.selectedRow - 1,
          this.selectedName,
          this.selectedSex,
          this.selectedYob,
          this.disciplineCell,
          this.organisation,
          this.swevidPath,
        );
        this.close(result);
      } catch (e) {
        this.close({ success: false, error: e.message });
      }
    })();
  }

  close(result?: { success: boolean; error?: string }) {
    this.selectedSheet = '';
    this.selectedRow = 0;
    this.selectedName = '';
    this.selectedSex = '';
    this.selectedYob = '';
    this.disciplineCell = {};
    this.jsonFile = null;
    this.swevidPath = '';
    this.activeModal.close(result || { success: false });
  }

  private async readFile(path: string): Promise<Buffer> {
    return new Promise((resolve) => {
      this.electronService.fs.readFile(path, null, (err, data) => {
        if (err) {
          resolve(null);
          return;
        }

        resolve(data);
      });
    });
  }

  private prettifyAndConcatName(): string {
    let name = this.selectedName;
    if (this.selectedSurname) {
      name = name + ' ' + this.selectedSurname;
    }

    return name
      .trim()
      .toLowerCase()
      .split(/[\s-]+/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
