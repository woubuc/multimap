# MultiMap
Wrapper around `Map` with utility functions for maps containing an array of items for each key.

### Usage
Install the package into your dependencies
```
yarn add @woubuc/multimap
```

Use the map
```typescript
import MultiMap from '@woubuc/multimap';

const map = new MultiMap();

map.set('foo', [1]); // foo: [1]
map.push('foo', 2); // foo: [1, 2]
map.delete('foo'); // foo: undefined
map.push('foo', 3); // foo: [3]
```

[View the full API](./docs/API.md)

### License
[MIT license](./LICENSE)
