# Lucy Compose

## Agnostic scene composition for Lucidity

lucy.compose helps compose views from transitions, effects and scenes.

Usage example:

```js
  const compose = require('lucy-compose')

  const fx    = new compose.Source('fx')
  const scene = new compose.Source('scene')
  const trans = new compose.Source('transition')
```

Compose a view from a single scene.

```js
  // expects scene/cube.js or scene/cube/index.js to exist
  scene('cube')

  // same scene but with some additional options (these are passed right through
  // to the scene's "setup" function).
  scene('cube', {distance: 5.0, extent: 1.0})
```

Compose different views with and without postprocessing effect.

```js
  let comps = 
    { scene('cube')
    , fx('blur', {amount:0.3}
      , scene('cube')
      )
    }

```

Transition between 'cube' and 'sphere' scenes using 'fade'.
```js
  transition('fade', {position:0.3}
    , scene('cube')
    , scene('sphere')
    )
```
## Scene API

In order to be composed, scenes should implement the following methods:

   * **setup([options], [sub scenes])**
       Should return a scene. Called once on scene composition.
       It is up to what makes most sense in the project to create a new
       scene on each setup or to use a singleton, keeping state stable on
       composition changes.
   * **scene.render(time [, target])**
       Render the scene, optionally targetting the provided
       target object. Called on each frame.

## Installation

```shell
  npm install lucidogen/lucy-compose --save
```

## Tests

```shell
   npm test
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Especialy, do not use semicolons for statements where not to required, use comma
at the beginning of lines for lists and dictionaries.

Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
