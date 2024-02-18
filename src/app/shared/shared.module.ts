import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionTitleComponent } from './components/section-title.component';
import { InputCopyComponent } from './components/input-copy/input-copy.component';

@NgModule({
  declarations: [
    InputCopyComponent,
    SectionTitleComponent
  ],
  exports: [
    InputCopyComponent,
    SectionTitleComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
