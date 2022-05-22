import {Directive, ElementRef, HostListener, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appOnlyNumbers]',
})
export class OnlyNumbersDirective implements OnInit {

  @Input() appOnlyNumbers = true;
  @Input() decimals = 0;
  @Input() maxIntegers = 0;
  @Input() maxDigitsLength = 0;

  private regex: RegExp = new RegExp(/^[0-9]*$/);
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (this.appOnlyNumbers) {
      // Allow Backspace, tab, end, and home keys
      if (this.specialKeys.indexOf(e.key) !== -1) {
        return;
      }

      if( ((e.keyCode === 65 || e.keyCode === 86 || e.keyCode === 67) && (e.ctrlKey === true || e.metaKey === true)) ||
      // Allow: home, end, left, right, down, up
      (e.keyCode >= 35 && e.keyCode <= 40)) {
          return;
      }

      // Do not use e.keycode this is deprecated.
      // See: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
      const current: string = this.el.nativeElement.value;
      // We need this because the current value on the DOM element
      // is not yet updated with the value from this event
      const next: string = current.concat(e.key);
      // if (next && !String(next).match(this.regex)) {
      //     e.preventDefault();
      // }
      if (next && this.isInvalid(next, this.decimals, this.maxIntegers, this.maxDigitsLength)) {
        e.preventDefault();
      }
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const pastedInput: string = event.clipboardData
      .getData('text/plain')
      .replace(/\D/g, ''); // get a digit-only string
    document.execCommand('insertText', false, pastedInput);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void{
    event.preventDefault();
    const textData = event.dataTransfer
      .getData('text').replace(/\D/g, '');
    this.el.nativeElement.focus();
    document.execCommand('insertText', false, textData);
  }

  ngOnInit(): void {
  }

  private isInvalid(value: string, decimals: number, maxIntegers: number, maxLength: number): any {
    if (maxLength >= 1) {
      value = value.replace('.', '');
      if (value.length > maxLength) { return true; }
    }

    if (maxIntegers >= 1 && value?.split('.')[0].toString().length > maxIntegers) { return true; }
    if (decimals > 0) {
        const regExpString = '^\\s*((\\d+(\\.\\d{0,' + decimals + '})?)|((\\d*(\\.\\d{1,' + decimals + '}))))\\s*$';
        return !String(value).match(new RegExp(regExpString));
    }
    return !String(value).match(this.regex);
  }
}
