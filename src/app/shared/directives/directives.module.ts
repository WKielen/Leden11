import { NgModule } from '@angular/core';
import { HoldableDirective } from './holdable.directive';
// De directive moet in een module worden geplakt omdat you cannot import directives/components. 
// You can only import modules. Once you import the module, you will have access to the directives/components 
// that the imported module exports.
@NgModule({
    declarations: [HoldableDirective],
    exports: [HoldableDirective]
  })
  export class HoldableModule { }