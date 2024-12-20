import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../core/services/excel/excel.service';
import { ElectronService } from '../core/services';
import { DatabaseService } from '../core/services/database/database.service';
import { Result } from '../../interface/Result';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CellPickerModalComponent } from './components/cell-picker-modal/cell.picker.modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  swevidPath: string = '';
  organisations: any[] = [];

  selectedOrganisation: any = null;

  constructor(
    private excelService: ExcelService,
    private electronService: ElectronService,
    private databaseService: DatabaseService,
    private modal: NgbModal,
    private toastService: ToastrService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getSwevidPath();
    if (!this.swevidPath) return;

    await this.parseOrganisations();
  }

  async getSwevidPath(): Promise<Result<string>> {
    const config = await this.databaseService.findOne('configurations', {
      key: 'swevid-path',
    });
    if (!config) return;

    this.swevidPath = config.options.path;
  }

  private async parseOrganisations() {
    const dbfOrg = await this.electronService.dbffile.DBFFile.open(
      this.swevidPath + '/Baza/Organizacija.DBF',
    );

    if (!dbfOrg.recordCount) return;

    const data = [];
    for await (const record of dbfOrg) data.push(record);

    this.organisations = data.map((org) => ({
      ...org,
      NAZIV: this.electronService.replaceNonAscii(org.NAZIV),
    }));
  }

  onSelectOrganisation(org) {
    this.selectedOrganisation = org;
  }

  onFileAdd(file: File) {
    const jsonFile = this.excelService.convertToJSON(file);

    return this.openModal(jsonFile);
  }

  private openModal(jsonFile: any) {
    const modal = this.modal.open(CellPickerModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'xl',
    });
    modal.componentInstance.jsonFile = jsonFile;
    modal.componentInstance.swevidPath = this.swevidPath;
    modal.componentInstance.organisation = this.selectedOrganisation;
    modal.result.then((res) => {
      if (!res.success) {
        this.toastService.error(res.error || 'Error');
      } else {
        this.toastService.success(
          'Excel File imported successfully to SWEVID!',
        );
      }
    });
  }

  async onFolderPick() {
    const path = await this.electronService.dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory'],
    });
    if (path.canceled) return;

    const config = await this.databaseService.findOne('configurations', {
      key: 'swevid-path',
    });
    if (!config) {
      await this.databaseService.create('configurations', {
        key: 'swevid-path',
        options: { path: path.filePaths[0] },
      });
      window.location.reload();
      return;
    }

    await this.databaseService.update(
      'configurations',
      { key: 'swevid-path' },
      {
        key: 'swevid-path',
        options: { path: path.filePaths[0] },
      },
      false,
    );
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
