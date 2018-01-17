import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';
import { ReportCardComponent } from './report-card/report-card';
import { TransactionCardComponent } from './transaction-card/transaction-card';
@NgModule({
	declarations: [
		ReportCardComponent,
		TransactionCardComponent
	],
	imports: [
		IonicModule,
		PipesModule
	],
	exports: [
		ReportCardComponent,
		TransactionCardComponent
	],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class ComponentsModule {}
