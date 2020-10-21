import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NoteService } from '../../../../services/note.service';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { Note, PostStatus } from '../../../../models/note';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'app-note-details',
    templateUrl: './note-details.page.html',
    styleUrls: [ './note-details.page.scss' ],
})
export class NoteDetailsPage implements OnInit {
    title: string = 'Notatka';
    noteId: number;
    note$: BehaviorSubject<Note> = new BehaviorSubject<Note>(null);
    noteFormGroup: FormGroup;
    isChecklist: boolean = false;

    get note(): Note {
        return this.note$.value;
    }

    set noteValue(data: Note) {
        this.note$.next(data);
    }

    constructor(private route: ActivatedRoute, private noteService: NoteService, private formBuilder: FormBuilder, private userService: UserService) {
        this.getNote();

    }

    ngOnInit() {}


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
        console.log(this.note$.value ? this.note$.value.assignees : [], this.note$.value);
        this.noteFormGroup = this.formBuilder.group({
            name: [ this.note$.value ? this.note$.value.name : '', [Validators.required] ],
            content: [ this.note$.value ? this.note$.value.content : '' ],
            project: [ null, [Validators.required] ],
            assignees: [this.note$.value ? this.note$.value.assignees : [], [Validators.required] ],
            poster: this.userService, // TODO this.authService.user
            status: this.note$.value ? this.note$.value.status : PostStatus.CHECKLIST,
        });
    }
}
