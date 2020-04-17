import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonSelectNoCaretDirective } from './ion-select-no-caret.directive';



@NgModule({
  declarations: [IonSelectNoCaretDirective],
  imports: [
    CommonModule
  ],
  exports: [IonSelectNoCaretDirective]
})
export class DirectivesModule { }
