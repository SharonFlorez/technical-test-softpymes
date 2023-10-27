import { ModuleWithProviders, NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatInputModule,
    MatTableModule,
  ],
  providers: [],
})
export class MaterialModule {
  static forRoot(): ModuleWithProviders<MaterialModule> {
    return {
      ngModule: MaterialModule,
    };
  }
}
