/// <reference path="./../typings/ng2-formly.d.ts" />
import {Component, Inject} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {FormlyConfig} from "./../src/services/formly.config";
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
    providers: [
        FormlyConfig
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
    field3;
    fields;

    user: any = {};
    user2: any = {};

    constructor(@Inject(FormlyConfig) formlyConfig: FormlyConfig) {
        formlyConfig.setType({
            name: 'test',
            template: 'this is a test: {{ field.key }} {{ field.templateOptions.color }}',
            wrapper: ['woo'],
            templateOptions: {
                color: 'green'
            }
        })

        formlyConfig.setWrapper({
            template: 'Default Wrapper | <formly-transclude></formly-transclude> | Wrapper Default'
        })

        formlyConfig.setWrapper({
            name: 'woo',
            template: 'Woo Wrapper || <formly-transclude></formly-transclude> || Wrapper Woo'
        })

        this.field = {
            key: "woo",
            type: 'test'
        };

        this.field2 = {
            key: "woo2",
            type: 'test',
            templateOptions: {
                color: "blue"
            }
        };

        this.field3 = {
            key: "yep",
            template: "Oh <i>{{ field.key }} {{ field.key }}!</i>"
        };

        this.fields = [
            {
                key: "woo",
                type: 'test'
            },
            {
                key: "woo2",
                type: 'test',
                templateOptions: {
                    color: "blue"
                }
            },
            {
                key: "yep",
                template: "Oh <i>{{ field.key }} {{ field.key }}!</i>"
            }
        ]
    }
}

bootstrap(HelloApp);