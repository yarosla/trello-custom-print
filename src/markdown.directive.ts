import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as marked from 'marked';

@Directive({
    selector: '[markdown]',
    host: {
        'class': 'markdown'
    }
})
export class MarkdownDirective implements OnChanges {
    @Input()
    private markdown: string;
    private options: marked.MarkedOptions;

    constructor(private element: ElementRef) {
        let renderer = new marked.Renderer();
        let inline = ['SPAN', 'B', 'I'].includes(element.nativeElement.tagName);
        if (inline) {
            // do not render block elements
            let sameText = (text: string) => text;
            renderer.listitem = renderer.paragraph = renderer.blockquote =
                renderer.code = renderer.heading = sameText;
        }
        this.options = { renderer: renderer, breaks: true };
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.element.nativeElement.innerHTML = marked(this.markdown, this.options);
    }
}
