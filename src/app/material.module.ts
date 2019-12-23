import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatTableModule,
  MatCardModule,
  MatListModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    MatListModule
  ]
})
export class MaterialModule {}