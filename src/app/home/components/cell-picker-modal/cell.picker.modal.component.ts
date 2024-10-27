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
  selectedClass: string = '';

  showSurname: boolean = false;
  selectedSurname: string = '';

  disciplinesFrom: string = '';
  disciplinesTo: string = '';
  disciplinesColumns: string[] = [];
  disciplines: any[] = [];
  filteredDisciplines: any[] = [];

  disciplineCell: { [cell: string]: any } = {};
  poolLength: 25 | 50 = 50;

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

    const dbfDisciplines = await this.electronService.dbffile.DBFFile.open(
      this.swevidPath + '/Baza/Disciplina.DBF',
    );
    if (!dbfDisciplines.recordCount) return;

    const data = [];
    for await (const record of dbfDisciplines) data.push(record);

    this.disciplines = data.map((disc) => ({
      ...disc,
      NAZIV: this.electronService.replaceNonAscii(disc.NAZIV),
    }));

    this.filterDisciplines();
  }

  filterDisciplines() {
    this.filteredDisciplines = this.disciplines.filter(
      ({ BAZEN }) => BAZEN === this.poolLength,
    );
  }

  onPoolLengthChange() {
    this.filterDisciplines();
  }

  addSurname() {
    this.showSurname = !this.showSurname;
  }

  submit() {
    this.promiseBtn = (async () => {
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
          this.selectedSurname,
          this.selectedClass,
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
}
