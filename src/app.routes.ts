import {Routes} from '@angular/router';
import {BoardsListComponent} from './boards-list.component';
import {TrelloAuthComponent} from './trello-auth.component';
import {TrelloAuthGuard} from './trello-auth.guard';
import {BoardDetailComponent} from './board-detail.component';

export const rootRouterConfig: Routes = [
    {path: '', redirectTo: 'auth', pathMatch: 'full'},
    {path: 'auth', component: TrelloAuthComponent},
    {
        path: 'boards',
        children: [
            {path: '', component: BoardsListComponent, canActivate: [TrelloAuthGuard]},
            {path: ':boardId', component: BoardDetailComponent, canActivate: [TrelloAuthGuard]}
        ]
    }
];
