import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appGreenColor]',
})
export class GreenColorDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @Input('appGreenColor') backgroundColor: string = 'transparent';
  @HostBinding('style.backgroundColor') color: string = this.backgroundColor;
  //this is used instead of renderer2

  ngOnInit(): void {
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'green');
    this.color = this.backgroundColor;
  }

  @HostListener('mouseover') mouseenter(event: Event) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'text-shadow',
      '1px 1px 6px green'
    );
  }
  @HostListener('mouseleave') mouseleave(event: Event) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'text-shadow',
      'none'
    );
  }
}
