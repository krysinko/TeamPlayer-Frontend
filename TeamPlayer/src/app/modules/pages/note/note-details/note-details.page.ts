import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {NoteService} from '../../../../services/note.service';
import {switchMap} from 'rxjs/operators';
import {BehaviorSubject, of} from 'rxjs';
import {Note, PostStatus} from '../../../../models/note';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {NoteChecklist} from '../../../../models/note-types';

@Component({
    selector: 'app-note-details',
    templateUrl: './note-details.page.html',
    styleUrls: ['./note-details.page.scss'],
})
export class NoteDetailsPage implements OnInit {
    title: string = 'Notatka';
    noteId: number;
    note$: BehaviorSubject<Note> = new BehaviorSubject<Note>(null);
    noteFormGroup: FormGroup;
    isChecklist: boolean = false;
    contentFormArray: FormArray;
    private readonly emptyNoteCheck = new NoteChecklist('', false, false);

    get note(): Note {
        return this.note$.value;
    }

    set noteValue(data: Note) {
        this.note$.next(data);
    }

    constructor(private route: ActivatedRoute, private noteService: NoteService, private formBuilder: FormBuilder, private userService: UserService) {
        this.getNote();
    }

    ngOnInit() {
    }

    addNewCheckItem(): void {
        if (this.isChecklist) {
            const notes: NoteChecklist[] = this.note.content;
            notes.push(this.emptyNoteCheck);
            this.noteValue = {...this.note, content: notes};
            (this.noteFormGroup.controls['content'] as FormArray).push(
                this.formBuilder.group(
                    {
                        label: this.emptyNoteCheck.label,
                        checked: this.emptyNoteCheck.checked,
                        saved: this.emptyNoteCheck.saved,
                    }
                )
            );
            this.contentFormArray = this.noteFormGroup.controls['content'] as FormArray;
        }
    }

    getNoteFormGroup(i): FormGroup {
        return (this.contentFormArray.controls[i] as unknown) as FormGroup;
    }

    saveNewCheck1(): void {
    }

    saveNewContent(i: number): void {
        const currentNoteContent: NoteChecklist[] = this.note.content;
        currentNoteContent[i] = this.getNoteFormGroup(i).value;
        console.log('new val', currentNoteContent);

        this.noteValue = {...this.note, content: currentNoteContent};
        console.log(this.note);
        this.postNote();
    }

    yyy(N) {
        console.log(N);
    }

    removeCheck(indexToRemove: number): void {
        const newContent: NoteChecklist[] = this.note.content.filter((n: NoteChecklist, i: number) => i !== indexToRemove);
        this.noteValue = {...this.note, content: newContent};
        console.log(newContent);
        this.postNote();
    }

    private postNote(): void {
        this.noteService.saveNote(this.note).subscribe((note: Note) => {
            this.noteValue = note;
            this.contentFormArray = this.buildContentFormArray(note.content);
            // this.buildNoteForm();
        });
    }


    private getNote(): void {
        this.route.paramMap
            .pipe(
                switchMap((params: ParamMap) => {
                    if (params.keys.length) {
                        this.noteId = Number(params.get('id'));
                        return this.noteService.getNoteById(this.noteId);
                    }
                    return of<Note>(null);
                })
            )
            .subscribe((note: Note) => {
                if (note) {
                    this.noteValue = note;
                    if (note.status === PostStatus.CHECKLIST) {
                        this.isChecklist = true;
                    }
                }
                this.buildNoteForm();
            });
    }

    private buildNoteForm() {
        console.log(this.note ? this.note.assignees : [], this.note);

        const contentArr: FormArray = this.buildContentFormArray();

        this.contentFormArray = contentArr;
        console.log(contentArr);
        this.noteFormGroup = this.formBuilder.group({
            name: [this.note ? this.note.name : '', [Validators.required]],
            content: contentArr as FormArray,
            project: [null, [Validators.required]],
            assignees: [this.note.assignees],
            poster: this.userService, // TODO this.authService.user
            status: this.note ? this.note.status : PostStatus.CHECKLIST,
        });
        console.log(this.noteFormGroup);
    }

    private buildContentFormArray(content: NoteChecklist[] = this.note.content): FormArray {
        const contentArr: FormArray = this.formBuilder.array([]);
        content.forEach((val: NoteChecklist) => {
            contentArr.push(this.formBuilder.group({
                    label: val.label,
                    checked: val.checked,
                    saved: val.saved,
                })
            );
        });
        return contentArr;
    }
}
