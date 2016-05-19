import {
    Component, Input, Inject, ViewChild, Directive, Type,
    ComponentResolver, Injector, ViewContainerRef
} from 'angular2/core';

import * as _ from 'lodash';
import {FormlyConfig, IFieldConfig} from '../main';
import {IFieldWrapperConfig} from "../services/formly.config";

@Component({
    selector: "formly-field",
    template: ``
})
export class FormlyField {
    @Input() model: Object;
    @Input() key: string;
    @Input() field: IFieldConfig;

    constructor(@Inject(FormlyConfig) protected fc: FormlyConfig,
                protected view: ViewContainerRef,
                protected compResolver:ComponentResolver,
                protected injector: Injector
    ) {}

    ngAfterViewInit() {
        let template = <string>this.field.template
        let templateManipulators: Object = this.field.templateManipulators || {};

        template = this.applyTemplateManipulatorsFactory(templateManipulators.preWrapper || [])(template);
        template = this.applyWrappers(template);
        template = this.applyTemplateManipulatorsFactory(templateManipulators.postWrapper || [])(template);

        let dynamicComponent = this.createDynamicFieldComponent(template);
        this.compResolver.resolveComponent(dynamicComponent)
            .then(factory => {
                this.view.createComponent(factory, 0, this.injector);
            })
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
            template
        })
        class DynamicComponent {
            field: IFieldConfig;
            constructor(public formlyField: FormlyField) {
                this.field = formlyField.field;
            }
        }

        return DynamicComponent
    }

    applyWrappers(template: string): string {
        var wrappers: Array<IFieldWrapperConfig> = this.fc.getWrappersByType(this.field.type);

        return wrappers.reduce((currentTemplate, wrapper) => {
            return wrapper.template.replace('<formly-transclude></formly-transclude>', template);
        }, template);
    }

    applyTemplateManipulatorsFactory(manipulators: Array<Function>): Function {
        manipulators = manipulators || [];

        return (template): string => {
            return manipulators.reduce((currentTemplate, manipulator) => {
                return manipulator.call(this, template, this.field);
            }, template);
        };
    }
}