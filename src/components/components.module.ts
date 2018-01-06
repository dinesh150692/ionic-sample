import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ReportCardComponent } from './report-card/report-card';
@NgModule({
	declarations: [ReportCardComponent],
	imports: [IonicModule],
	exports: [ReportCardComponent],
	schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ]
})
export class ComponentsModule {}
