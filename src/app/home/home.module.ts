import { DataParser } from './components/parser/data.parser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ExcelService } from '../core/services/excel/excel.service';
import { DatabaseService } from '../core/services/database/database.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CellPickerModalComponent } from './components/cell-picker-modal/cell.picker.modal.component';
import { Angular2PromiseButtonModule } from 'angular2-promise-buttons';
import { InvalidCellModalComponent } from './components/invalid-cell-modal/invalid.cell.modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    CellPickerModalComponent,
    InvalidCellModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    NgSelectModule,
    Angular2PromiseButtonModule,
  ],
  providers: [ExcelService, DatabaseService, DataParser],
  entryComponents: [CellPickerModalComponent, InvalidCellModalComponent],
})
export class HomeModule {}
