import { NgModule } from '@angular/core';
import { TimesAgoPipe } from './times-ago/times-ago';
import { MaskPipe } from './mask/mask';
@NgModule({
	declarations: [
		TimesAgoPipe,
		MaskPipe,
	],
	imports: [],
	exports: [
		TimesAgoPipe,
		MaskPipe,
	]
})
export class PipesModule {}
