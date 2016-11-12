import {Component, Input} from '@angular/core';
import {TrelloCard} from '../trello.interfaces';
import {CardDetailComponent} from '../card-detail-wrapper.component';

@Component({
    selector: 'basic-card-detail',
    templateUrl: './basic-card-detail.component.html',
    styles: [`
                .trello-card {
                    display: block; line-height: 1.25;
                    margin: 0 0 10px; padding: 10px 0 0 0;
                    border-top: solid 1px #aaa;
                }
                .desc {font-size:80%; padding-left: 20px;}
                .checklist {font-size:80%; margin: 0 0 10px; padding-left: 20px;}
                .complete {text-decoration: line-through;}
            `]
})
export class BasicCardDetailComponent implements CardDetailComponent {
    @Input()
    card: TrelloCard;
}
