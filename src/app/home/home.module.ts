import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { ExcelService } from "../core/services/excel/excel.service";
import { DatabaseService } from "../core/services/database/database.service";

@NgModule({
    declarations: [HomeComponent],
    imports: [
        CommonModule,
        SharedModule,
        HomeRoutingModule
    ],
    providers: [
        ExcelService,
        DatabaseService
    ]
})
export class HomeModule {
}
