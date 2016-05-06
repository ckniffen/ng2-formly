/// <reference path="./../typings/ng2-formly.d.ts" />
import {Component} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {FormlyField} from "./../src/components/formly.field";
import {FormlyForm} from "./../src/components/formly.form";

/*************************************************************
    Interface for FormlyFields and FormlyTemplateOptions
 *************************************************************/

@Component({
    directives: [
        FormlyField,
        FormlyForm
    ],
    selector: "hello-app",
    templateUrl: "../demo/template.html"
})
export class HelloApp {
    form;
    Stream;
    author;
    env;

    field;
    field2;
    fields;

    user: any = {};
    user2: any = {};

    constructor() {
        this.field = {
            key: "woo",
            template: "Oh yeah! <i>{{ formlyField.field.key }}</i>",
            color: "green"
        };

        this.field2 = {
            key: "yep",
            template: "Oh <i>{{ formlyField.field.key }} {{ formlyField.field.key }}!</i>",
            color: "red"
        };

        this.fields = [
            {
                key: "woo",
                template: "Oh yeah! <i>{{ formlyField.field.key }}</i>",
                color: "green"
            },
            {
                key: "yep",
                template: "Oh <i>{{ formlyField.field.key }} {{ formlyField.field.key }}!</i>",
                color: "red"
            }
        ]
    }
}

bootstrap(HelloApp);