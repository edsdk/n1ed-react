import * as React from "react";
import {Editor, IAllProps} from "@tinymce/tinymce-react";

export class N1ED extends React.Component<IAllProps> {

    // Do not store in state, because this is global flag was script loaded on the page or not
    static loaded: boolean = false;

    componentWillMount() {
        if (N1ED.loaded)
            return;

        let apiKey = "REACDFLT";
        let passedApiKey = this.props.apiKey;
        if (!passedApiKey && this.props.init && this.props.init.apiKey)
            passedApiKey = this.props.init.apiKey;
        if (passedApiKey) {
            if (passedApiKey.length === 8)
                apiKey = passedApiKey;
            else
                console.log("Warning: invalid API key passed to N1ED");
        }

        (window as any).tinymce = null; // to prevent incorrect codebase usage
        this.includeJS("https://cloud.n1ed.com/cdn/" + apiKey + "/n1tinymce.js", () => {

            this.waitForTinyMCELoaded(
                () => {
                    N1ED.loaded = true;
                    this.forceUpdate();
                }
            );

        });
    }

    render() {
        if (N1ED.loaded) {

            let config = JSON.parse(JSON.stringify((window as any).n1edConfig));

            if (!!this.props.init)
                this.mergeConfigs(config, this.props.init);

            config["integration"] = "react";

            // @ts-ignore
            return <Editor {...this.props} apiKey={undefined} inline={false} outputFormat="html" init={config}/>
        } else {
            return <div className="n1ed-loading"/>;
        }
    }

    mergeConfigs(jsonResult: any, jsonAdd: any) {
        for (const key in jsonAdd) {
            if (jsonAdd.hasOwnProperty(key)) {
                let valueResult = jsonResult[key];
                let valueAdd = jsonAdd[key];

                if (
                    valueResult != null &&
                    valueAdd != null &&
                    !Array.isArray(valueResult) &&
                    !Array.isArray(valueAdd) &&
                    typeof(valueResult) === "object" &&
                    typeof(valueAdd) === "object"
                ) {
                    this.mergeConfigs(valueResult, valueAdd);
                } else {
                    jsonResult[key] = valueAdd;
                }
            }
        }
    }

    private waitForTinyMCELoaded(callback: () => void) {
        if (!(window as any).tinymce || !(window as any).n1edConfig) {
            setTimeout(() => {
                this.waitForTinyMCELoaded(callback);
            }, 100);
        } else {
            callback();
        }
    }

    private includeJS(urlJS: string, callback?: (wasAlreadyLoaded: boolean) => void): HTMLScriptElement | null {
        let doc = document;
        let scripts = doc.getElementsByTagName("script");
        let alreadyExists = false;
        for (let i: number = 0; i < scripts.length; i++) {
            let src: string | null = scripts[i].getAttribute("src");
            if (src && src === urlJS)
                alreadyExists = true;
        }
        if (!alreadyExists) {
            let script: any = doc.createElement("script");
            script.type = "text/javascript";
            if (callback != null) {
                if (script.readyState) {  // IE
                    script.onreadystatechange = function () {
                        if (script.readyState === "loaded" || script.readyState === "complete") {
                            script.onreadystatechange = null;
                            callback(false);
                        }
                    };
                } else {  // Others
                    script.onload = function () {
                        callback(false);
                    };
                }
            }
            script.src = urlJS;
            doc.getElementsByTagName("head")[0].appendChild(script);
            return script;
        } else {
            if (callback != null)
                callback(true);
            return null;
        }
    }

}