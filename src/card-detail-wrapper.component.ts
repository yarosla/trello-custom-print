import {Component, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver, ComponentRef, Type, ChangeDetectorRef, OnChanges, OnDestroy, AfterViewInit} from '@angular/core';
import {TrelloCard} from './trello.interfaces';
import {BoardSettings} from './settings.service';

export interface CardDetailComponent {
    card: TrelloCard;
    settings: BoardSettings;
}

// Dynamic component selector implementation
// Code from http://stackoverflow.com/a/36325468/697313

@Component({
    selector: 'card-detail',
    template: '<div class="card-detail-wrapper" #target></div>'
})
export class CardDetailWrapperComponent implements CardDetailComponent, OnChanges, OnDestroy, AfterViewInit {
    @Input()
    card: TrelloCard;
    @Input()
    settings: BoardSettings;
    @Input()
    type: Type<CardDetailComponent>;
    @ViewChild('target', {read: ViewContainerRef})
    target: ViewContainerRef;
    cmpRef: ComponentRef<CardDetailComponent>;
    private isViewInitialized: boolean = false;

    constructor(private componentFactoryResolver: ComponentFactoryResolver, private changeDetector: ChangeDetectorRef) {}

    private updateComponent() {
        if (!this.isViewInitialized) return;
        if (this.cmpRef) {
            // when the `type` input changes we destroy a previously
            // created component before creating the new one
            this.cmpRef.destroy();
        }

        let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
        this.cmpRef = this.target.createComponent(factory) as ComponentRef<CardDetailComponent>;
        // bind inputs
        this.cmpRef.instance.card = this.card;
        this.cmpRef.instance.settings = this.settings;
        this.changeDetector.detectChanges();
        // bind output
        // this.cmpRef.instance.someOutput.subscribe(val => doSomething());
    }

    ngOnChanges() {
        this.updateComponent();
    }

    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.updateComponent();
    }

    ngOnDestroy() {
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }
}
