import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgControl } from '@angular/forms';
import { ControlValueCore } from '../control-value-core';
import { IonTextarea } from '@ionic/angular';

@Component({
    selector: 'app-textarea-input',
    templateUrl: './textarea-input.component.html',
    styleUrls: [ './textarea-input.component.scss' ],
})
export class TextareaInputComponent extends ControlValueCore implements OnInit {

    get value() {
        return this._value;
    }

    set value(v: string) {
        console.log('set', v);
        if (v !== this._value) {
            this._value = v;
        }
    }

    @Input() label: string;
    @Input() placeholder: string;
    @Output() valueSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('textareaElement', { read: IonTextarea, static: false }) textareaElement: IonTextarea;

    _value: string = '';
    buttonsVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private originalValue: string;

    constructor(public ngControl: NgControl) {
        super(ngControl);
    }

    ngOnInit() {
        this.originalValue = this.value;
    }

    clearTextareaValue() {
        this.value = '';
    }

    submitValueToParent() {
        this.onChange(this.value);
        this.onTouch(this.value);
        this.valueSubmitted.emit();
        this.deactivateButtons();
    }

    activateButtons() {
        this.buttonsVisible$.next(true);
    }

    deactivateButtons() {
        this.buttonsVisible$.next(false);
    }

    setFocusOnTextarea() {
        this.textareaElement.setFocus();
    }
}
