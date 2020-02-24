# Official N1ED React component

> Create and edit HTML content with powerful visual page builder based on TinyMCE 5

**Q:** What can be better than TinyMCE 5?\
**A:** TinyMCE 5 + free set of widgets, custom templates, modern UI and visual configuration: [N1ED](https://n1ed.com).

This module will help to integrate N1ED (bundled TinyMCE 5 + all required free add-ons which power up it) into your React app.

## Install

With [npm](https://npmjs.com/) installed, run

```
$ npm install --save @edsdk/n1ed-react
```


## Usage

```js
import {N1ED} from "@edsdk/n1ed-react";


class YourReactComponent {
    
    render() {
        
        return <div>
            Edit the content:
            <N1ED 
                ...options here...
                init={{ /* other settings */ }} 
            />
        </div>;
        
    }
    
}
```

All the attributes of ```<N1ED>``` element are described in offical [TinyMCE React docs](https://www.tiny.cloud/docs/integrations/react/).

The only difference is:

* ```apiKey``` attribute here is related not to TinyMCE Cloud, but to N1ED cloud and is optional until you need to visually configure it or add some [other add-on](https://n1ed.com/plugins) from N1ED Ecosystem. 

* N1ED has 3 own UI modes (Classic, FullScreen and Dialog).

* You do not need to define ```plugins``` parameter with ```N1ED``` value: it is already defined until you specify something another.

## Examples

We have two examples how to use N1ED React component:
* [N1ED React example (JavaScript)](https://github.com/edsdk/n1ed-react-example)
* [N1ED React example (TypeScript)](https://github.com/edsdk/n1ed-react-typescript-example)

## Technical details

```@edsdk/n1ed-react``` uses ```@tinymce/tinymce-react``` module inside and delegates all calls to TinyMCE, except some special actions it does for initialization of correct environment related to connection with dinamyc CDN (which makes possible configuring your N1ED+TinyMCE instance visually online using [Dashboard](https://n1ed.com)).

## TypeScript support

This module is written with TypeScript and can be used in both JS and TS projects. You do not need to install typings separately, they are built in the project.

## License

This module is released under LGPL v3 and free to use in your projects. N1ED itself is also free product.