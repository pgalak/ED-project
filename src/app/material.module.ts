import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatTableModule,
  MatCardModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule
  ]
})
export class MaterialModule {}