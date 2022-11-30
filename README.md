# TinyMCE + N1ED React component

> Create and edit HTML content with a powerful visual page builder based on TinyMCE

**Q:** What can be better than TinyMCE?\
**A:** The latest TinyMCE 6 + a free set of widgets, custom templates, modern UI, Flmngr file manager, ImgPen image editor, Bootstrap column editor, and visual configuration: [N1ED](https://n1ed.com).

![N1ED screenshot](https://n1ed.com/img/screenshots/docs/widgets/button/edit-button.png)

This module will help to integrate N1ED (bundled TinyMCE + all required free add-ons that power up it) into your React app.


## Install

With [npm](https://npmjs.com/) installed, run

```
$ npm install --save @edsdk/n1ed-react
```

See full [React + TinyMCE + N1ED installation manual](https://n1ed.com/doc/install-n1ed-react-component) for more.


## Usage

Here is an example of the usage of TinyMCE + N1ED in your React component. This is a JS sample, see the links below for TypeScript and JavaScript GitHub sample projects. 

In this example we use add N1ED and additionally (this is an optional) define a custom toolbar and create inside it a custom TinyMCE button in order to show how to work with basic TinyMCE features from N1ED.

```js
import React from 'react';
import {N1ED} from '@edsdk/n1ed-react';


class YourReactComponent {

    handleEditorChange(content, editor) {
        console.log('Content was updated:', content);
    };
    
    render() {
        
        return <div>
            Edit the content:
            <N1ED
                apiKey="REACDFLT" // you will use your own key later
                initialValue="<p>N1ED react demo</p>"
                onEditorChange={this.handleEditorChange}

                init={{
                    height: 500,
                    toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | myCustomToolbarButton',
                    setup: (editor) => {
                        // Just a sample of creating a custom button
                        // N1ED does not block this TinyMCE feature
                        // and also does not conflict with TinyMCE plugins
                        console.log("TinyMCE initialized");
                        editor.ui.registry.addButton('myCustomToolbarButton', {
                            text: 'My Custom Button',
                            onAction: () => alert('Custom button clicked!'),
                        });
                    },
                }}
            />
        </div>;
        
    }
    
}
```

**Important note:**: do NOT use TinyMCE as a *controlled* component (do NOT try to control the state of TinyMCE with a pair of `initialValue`/`onEditorChange`). TinyMCE supports only setting of initial value once and then notifies your code about its change using the `onEditorChange` callback. React TinyMCE implementation is a classic *uncontrolled* component.  

All the attributes of ```<N1ED>``` element are described in official [TinyMCE React docs](https://www.tiny.cloud/docs/integrations/react/).

The only difference is:

* ```apiKey``` attribute here is related not to TinyMCE Cloud, but to N1ED cloud and is optional until you need to visually configure it or add some [other add-on](https://n1ed.com/plugins) from N1ED Ecosystem. 

* You do not need to define ```plugins``` parameter with the ```N1ED``` value: it is already defined until you specify something another.

## Examples

We have two examples of how to use the N1ED React component:
* [N1ED React example (JavaScript)](https://github.com/edsdk/n1ed-react-example)
* [N1ED React example (TypeScript)](https://github.com/edsdk/n1ed-react-typescript-example)

## Technical details

```@edsdk/n1ed-react``` uses ```@tinymce/tinymce-react``` module inside and delegates all calls to TinyMCE, except some special actions it does for initialization of correct environment related to connection with dynamic CDN (which makes possible configuring your N1ED+TinyMCE instance visually online using [Dashboard](https://n1ed.com)).

## TypeScript support

This module is written with TypeScript and can be used in both JS and TS projects. You do not need to install typings separately, they are built into the project.

## License

This module is released under LGPL v3 and free to use in your projects. N1ED itself is also a free product.