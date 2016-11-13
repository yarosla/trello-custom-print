import {Component, Input} from '@angular/core';
import {TrelloCard} from '../trello.interfaces';
import {CardDetailComponent} from '../card-detail-wrapper.component';
import {BoardSettings} from '../board-settings.component';

@Component({
    selector: 'basic-card-detail',
    templateUrl: './basic-card-detail.component.html',
    styles: [`
                .trello-card {
                    display:block; line-height:1.25;
                    margin:0 0 10px; padding:10px 0 0 0;
                    border-top:solid 1px #aaa;
                }
                .desc {font-size:80%; padding-left:20px;}
                .checklist {font-size:80%; margin:0 0 10px; padding-left:20px;}
                .complete {text-decoration:line-through;}
                .custom-field {
                    font-size:80%; display:inline-block; 
                    margin-right:10px; background-color:#fafafa; 
                    padding:2px 4px;
                }
            `]
})
export class BasicCardDetailComponent implements CardDetailComponent {
    @Input()
    card: TrelloCard;
    @Input()
    settings: BoardSettings;
}
