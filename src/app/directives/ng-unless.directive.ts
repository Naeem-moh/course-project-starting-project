import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appNgUnless]',
})
export class NgUnlessDirective {
  constructor(
    private tempRef: TemplateRef<any>,
    private containerRef: ViewContainerRef
  ) {}

  @Input('appNgUnless') set unless(condition: boolean) {
    if (condition) {
      this.containerRef.clear();
    } else {
      this.containerRef.createEmbeddedView(this.tempRef);
    }
  }
}
