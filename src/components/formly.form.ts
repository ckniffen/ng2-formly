import {Component, OnInit, Input} from "angular2/core";
import {ControlGroup, NgFormModel} from "angular2/common";
import {IFieldConfig} from "../services/formly.config";
import {FormlyField} from "../components/formly.field";


@Component({
    selector: "formly-form",
    template: `
        <formly-field
            *ngFor="let field of fields"
            [model]="model" 
            [key]="field.key"
            [field]="field">   
        </formly-field>
    `,
    directives: [FormlyField]
})
export class FormlyForm {
    @Input() model:Object;
    @Input() fields:Array<IFieldConfig>;
}