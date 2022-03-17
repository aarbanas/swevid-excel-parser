import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ExcelService } from "../core/services/excel/excel.service";
import { DatabaseService } from "../core/services/database/database.service";
import { NgSelectModule } from "@ng-select/ng-select";
import { CellPickerModalComponent } from "./components/cell-picker-modal/cell.picker.modal.component";

@NgModule({
    declarations: [
        HomeComponent,
        CellPickerModalComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule,
        NgSelectModule,
    ],
    providers: [
        ExcelService,
        DatabaseService
    ],
    entryComponents: [
        CellPickerModalComponent
    ]
})
export class HomeModule {
}
