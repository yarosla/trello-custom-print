import {Component, Input, ViewChild, AfterViewInit, Output, EventEmitter} from '@angular/core';
import {BoardSettings} from './settings.service';
import {TrelloBoard} from './trello.interfaces';
import {NgForm} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
    selector: 'board-settings',
    templateUrl: './board-settings.component.html',
    styles: [`
            `]
})
export class BoardSettingsComponent implements AfterViewInit {
    @Input()
    private settings: BoardSettings;
    @Input()
    private board: TrelloBoard;
    @Output()
    private settingsChanged = new EventEmitter<BoardSettings>();
    @ViewChild('form')
    private form: NgForm;

    ngAfterViewInit(): void {
        this.form.valueChanges.debounceTime(10).subscribe((v) => this.settingsChanged.emit(this.settings));
    }
}
