import {Component, Directive, Input, Type, ViewChild, Injectable,Inject, ViewContainerRef, DynamicComponentLoader, ComponentResolver, ReflectiveInjector} from "angular2/core";
import {ControlGroup, NgFormModel} from "angular2/common";
import {IFieldConfig} from "../services/formly.config";
import {FormlyField} from "../components/formly.field";

@Component({
    selector: "formly-form",
    template: `
        <!--<div child-host #child></div>-->
        <formly-field
            *ngFor="let field of fields"
            [model]="model" 
            [key]="field.key"
            [field]="field">   
        </formly-field>
    `,
    directives: [
        FormlyField
    ]
})
export class FormlyForm {
    @Input() model: Object;
    @Input() fields: Array<IFieldConfig>

    constructor(protected compiler: ComponentResolver,
                protected dcl: DynamicComponentLoader,
                protected viewContainer: ViewContainerRef) {
        console.log(this.fields);
    }

    // ngAfterViewInit() {
    //     let parentInjector = this.viewContainer.injector;
    //
    //     this.fields.forEach((field) => {
    //         //console.log('context', this.context);
    //         var template = <string>field.template
    //
    //         //templateManipulators(preWrapper)
    //         //applyWrappers
    //         //templateManipulators(postWrapper)
    //
    //         @Injectable()
    //         let fieldInjectable = field
    //
    //         let childInjector = ReflectiveInjector.resolveAndCreate(null, parentInjector);
    //
    //         var dynamicComponent = this.createDynamicFieldComponent(template);
    //         //this.dcl.loadNextToLocation(dynamicComponent, this.viewContainer);
    //         this.compiler.resolveComponent(dynamicComponent).then((factory) =>
    //             this.viewContainer.createComponent(factory, 0, this.viewContainer.injector));
    //     });
    // }

    // protected createDynamicFieldComponent(template: string) : Type {
    //     @Component({
    //         selector: 'formly-dynamic-field',
    //         template: template,
    //     })
    //     class DynamicComponent {
    //         constructor() {}
    //     }
    //
    //     return DynamicComponent
    // }
}