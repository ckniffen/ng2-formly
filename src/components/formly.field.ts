import {
    Component, Input, Inject, ViewChild, Directive, Type,
    DynamicComponentLoader, ElementRef, ViewContainerRef
} from 'angular2/core';

import * as _ from 'lodash';
import {FormlyConfig, IFieldConfig} from '../main';

@Directive({
    selector: '[child-host]',
})
class DivComponent {
    constructor(public viewContainer:ViewContainerRef){ }
}

@Component({
    selector: "formly-field",
    template: `
        <div child-host #child></div>
    `,
    directives: [DivComponent]
})
export class FormlyField {
    @Input() model: Object;
    @Input() key: string;
    @Input() field: IFieldConfig;

    @ViewChild(DivComponent) myChild: DivComponent;

    constructor(protected elem: ElementRef,
                @Inject(FormlyConfig) protected fc: FormlyConfig,
                protected viewContainer: ViewContainerRef,
                protected dcl: DynamicComponentLoader) {
        console.log('constructor', this.field);
    }

    ngAfterViewInit() {
        var template = <string>this.field.template

        //templateManipulators(preWrapper)
        //applyWrappers
        //templateManipulators(postWrapper)

        var dynamicComponent = this.createDynamicFieldComponent(template);
        this.dcl.loadNextToLocation(dynamicComponent, this.myChild.viewContainer);
    }

    ngOnInit() {
        if(this.field.type) {
            let type = this.fc.getType(this.field.type);
            _.defaultsDeep(this.field, type);
        }
    }

    protected createDynamicFieldComponent(template: string) : Type {
        @Component({
            selector: 'formly-dynamic-field',
            template: template
        })
        class DynamicComponent {
            field: IFieldConfig;
            constructor(public formlyField: FormlyField) {
                this.field = formlyField.field;
            }
        }

        return DynamicComponent
    }
}