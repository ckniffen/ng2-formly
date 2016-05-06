import {Injectable} from "angular2/core";

export interface IFieldTypeConfig {
    name: string;
    extends?: string;

    template?: string | Function;

    defaultOptions?: Object;
}

export interface IFieldWrapperConfig {
    name: string;
}


export interface IFormlyConfig {
    extras: {
        // disableNgModelAttrsManipulator: false,
        // fieldTransform: [],
        // ngModelAttrsManipulatorPreferUnbound: false,
        // removeChromeAutoComplete: false,
        // defaultHideDirective: 'ng-if',
        // getFieldId: null,
    }

    setType(type: IFieldTypeConfig);
    setTypes(types: Array<IFieldTypeConfig>);
    getType(name: string): IFieldTypeConfig;
    getTypes(): Object;
    //getTypeHeritage(name : string) : Array<string>;
    //getTypeHeritage(type : IFieldTypeConfig) : Array<string>;

    setWrapper(wrapper: IFieldWrapperConfig);
    setWrappers(wrappers: Array<IFieldWrapperConfig>);
    getWrapper(name?: string): IFieldWrapperConfig;
    getWrappersByType(name: string): Array<IFieldWrapperConfig>;
    removeWrappersForType(name: string): Array<IFieldWrapperConfig>;
    removeWrapperByName(name: string): IFieldWrapperConfig;
}

export interface IFieldConfig {
    type?: string;
    template?: string | Function;
    defaultValue: any;

    templateOptions?: Object;
    expressionProperties?: Object;
    data?: Object;
}

@Injectable()
export class FormlyConfig implements IFormlyConfig {
    protected types: { [path:string]: IFieldTypeConfig; } = {};
    protected wrappers: { [path:string]: IFieldWrapperConfig; } = {};

    extras: Object;

    setType(type:IFieldTypeConfig) {
        this.types[type.name] = type;
    }

    setTypes(types:Array<IFieldTypeConfig>) {
        types.forEach(this.setType);
    }

    getType(name:string):IFieldTypeConfig {
        return this.types[name];
    }

    getTypes():Object {
        return this.types;
    }

    // getTypeHeritage(name:string):Array<string> {
    //     return this.getTypeHeritage(this.getType(name));
    // }
    //
    // getTypeHeritage(type: IFieldTypeConfig): Array<string> {
    //     var heritage = []
    //     var currentParent = type;
    //     var parent = type.extends;
    //
    //     while (parent) {
    //         currentParent = this.getType(parent)
    //         heritage.push(currentParent)
    //         parent = currentParent.extends
    //     }
    //     return heritage
    // }

    setWrapper(wrapper:IFieldWrapperConfig) {
        this.setWrappers([wrapper]);
    }

    setWrappers(wrappers:Array<IFieldWrapperConfig>) {
        wrappers.forEach(this.setWrapper);
    }

    getWrapper(name?:string):IFieldWrapperConfig {
        return this.wrappers[name];
    }

    getWrappersByType(name:string):Array<IFieldWrapperConfig> {
        return null;
    }

    removeWrappersForType(name:string):Array<IFieldWrapperConfig> {
        return null;
    }

    removeWrapperByName(name:string):IFieldWrapperConfig {
        return null;
    }

    protected extendTypeOptions(type: IFieldTypeConfig) {
        var parentType = this.getType(type.extends);
    }

    protected extendTypeTemplate(type: IFieldTypeConfig, parentType: IFieldTypeConfig) {
        if(!type.template && parentType.template) {
            type.template === parentType.template;
        }
    }

    protected extendTypeDefaultOptions(type: IFieldTypeConfig, parentType: IFieldTypeConfig) {

    }
}