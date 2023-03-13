# MultiMap

[![npm](https://img.shields.io/npm/v/@woubuc/multimap)](https://www.npmjs.com/package/@woubuc/multimap)

Wrappers around `Map` with utility functions for maps containing arrays or sets of items for each key.

### Usage
Install the package into your dependencies
```
pnpm add @woubuc/multimap
```

Use the map
```typescript
import { ArrayMap, SetMap } from '@woubuc/multimap';

let arrays = new ArrayMap();
arrays.set('foo', [1]); // foo: [1]
arrays.push('foo', 2); // foo: [1, 2]
arrays.delete('foo'); // foo: undefined
arrays.push('foo', 3); // foo: [3]

let sets = new SetMap();
sets.add('foo', 1); // foo: Set(1)
sets.add('foo', 1); // foo: Set(1)
sets.add('foo', 2); // foo: Set(1, 2)
```

[View the full API docs](http://multimap.woubuc.be/modules.html)

### License
[MIT license](./LICENSE)
