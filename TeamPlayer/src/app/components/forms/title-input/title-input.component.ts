import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueCore } from '../control-value-core';
import { NgControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-title-input',
    templateUrl: './title-input.component.html',
    styleUrls: [ './title-input.component.scss' ],
})
export class TitleInputComponent extends ControlValueCore implements OnInit {

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
    @Output() valueSubmitted: EventEmitter<boolean> = new EventEmitter<boolean>();

    _value: string = '';
    buttonsVisible$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    private originalValue: string;

    constructor(public ngControl: NgControl) {
        super(ngControl);
    }

    ngOnInit() {
        this.originalValue = this.value;
    }

    clearTitleInput() {
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
}
