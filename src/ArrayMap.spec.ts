import tap from 'tap';
import { ArrayMap } from './ArrayMap';

tap.test('ArrayMap.has', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('foo', ['bar']);

	t.equal(
		map.has('foo'),
		true,
		'should return true for existing key',
	);
	t.equal(
		map.has('nonexistent'),
		false,
		'nonexistent key should return false',
	);

	t.end();
});

tap.test('ArrayMap.get', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('get', ['a', 'b']);

	t.same(
		map.get('get'),
		['a', 'b'],
		'should return the array for existing key',
	);
	t.same(
		map.get('nonexistent'),
		[],
		'nonexistent key should return an empty array',
	);

	t.end();
});

tap.test('ArrayMap.delete', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('delete', ['a', 'b']);

	t.equal(
		map.delete('delete'),
		true,
		'should return true if key was deleted',
	);
	t.equal(
		map.delete('delete'),
		false,
		'should return false if key was already deleted',
	);

	t.same(
		map.get('delete'),
		[],
		'key should no longer exist in map',
	);
	t.equal(
		map.has('delete'),
		false,
		'key should no longer exist in map',
	);

	t.end();
});

tap.test('ArrayMap.clear', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('clear', ['a', 'b']);

	map.clear();
	t.same(
		map.get('clear'),
		[],
		'values should be cleared',
	);

	t.end();
});

tap.test('ArrayMap.push', (t) => {
	let map = new ArrayMap<string, string>();

	map.push('push', 'a');
	map.push('push', 'b');
	t.same(
		map.get('push'),
		['a', 'b'],
		'sequential calls should add the items to the end of the array one by one',
	);

	map.push('push', 'c', 'd');
	t.same(
		map.get('push'),
		['a', 'b', 'c', 'd'],
		'combined call should add the items to the end of the array in the same order',
	);

	t.end();
});

tap.test('ArrayMap.pop', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('pop', ['a', 'b', 'c']);

	t.same(
		map.pop('pop'),
		'c',
		'should return the last item of the array',
	);
	t.same(
		map.get('pop'),
		['a', 'b'],
		'the popped item should be removed from the array',
	);

	t.end();
});

tap.test('ArrayMap.shift', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('shift', ['a', 'b']);

	t.same(
		map.shift('shift'),
		'a',
		'should return the first item of the array',
	);
	t.same(
		map.get('shift'),
		['b'],
		'the shifted item should be removed from the array',
	);

	t.end();
});

tap.test('ArrayMap.unshift', (t) => {
	let map = new ArrayMap<string, string>();

	map.unshift('unshift', 'a');
	map.unshift('unshift', 'b');
	t.same(
		map.get('unshift'),
		['b', 'a'],
		'sequential calls should add the items to the front of the array one by one',
	);

	map.unshift('unshift', 'c', 'd');
	t.same(
		map.get('unshift'),
		['c', 'd', 'b', 'a'],
		'combined call should add the items to the start of the array in the same order',
	);

	t.end();
});

tap.test('ArrayMap.sort', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('sort', ['b', 'a', 'c']);

	map.sort('sort');
	t.same(
		map.get('sort'),
		['a', 'b', 'c'],
		'should sort the items in the array using the default comparer',
	);

	map.sort('sort', (a, b) => b.localeCompare(a));
	t.same(
		map.get('sort'),
		['c', 'b', 'a'],
		'should sort the items in the array using the provided comparer function',
	);

	t.end();
});

tap.test('ArrayMap.reverse', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('reverse', ['a', 'b', 'c']);

	map.reverse('reverse');
	t.same(
		map.get('reverse'),
		['c', 'b', 'a'],
		'should reverse the order of the items in the array',
	);

	t.end();
});

tap.test('ArrayMap.size', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('a', ['a', 'b']);
	map.set('b', ['c']);

	t.equal(
		map.size,
		2,
		'should count the number of keys',
	);

	t.end();
});

tap.test('ArrayMap.flatSize', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('a', ['a', 'b']);
	map.set('b', ['c']);

	t.equal(
		map.flatSize,
		3,
		'should count the items inside all arrays',
	);

	t.end();
});

tap.test('ArrayMap.keys', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('a', ['a', 'b']);
	map.set('b', ['c']);

	t.same(
		map.keys(),
		['a', 'b'],
		'should return the keys',
	);

	t.end();
});

tap.test('ArrayMap.values', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('a', ['a', 'b']);
	map.set('b', ['c']);

	t.same(
		map.values(),
		[['a', 'b'], ['c']],
		'should return the arrays',
	);

	t.end();
});

tap.test('ArrayMap.flatValues', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('a', ['a', 'b']);
	map.set('b', ['c']);

	t.same(
		map.flatValues(),
		['a', 'b', 'c'],
		'should return the items inside all arrays',
	);

	t.end();
});

tap.test('ArrayMap.entries', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('a', ['a', 'b']);
	map.set('b', ['c']);

	t.same(
		map.entries(),
		[['a', ['a', 'b']], ['b', ['c']]],
		'should return the arrays as key-value pais',
	);

	t.end();
});

tap.test('ArrayMap.flatEntries', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('a', ['a', 'b']);
	map.set('b', ['c']);

	t.same(
		map.flatEntries(),
		[['a', 'a'], ['a', 'b'], ['b', 'c']],
		'should return the items inside all arrays as key-value pairs, repeating the key as needed',
	);

	t.end();
});

tap.test('ArrayMap.forEach', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('a', ['a', 'b']);
	map.set('b', ['c']);

	t.plan(map.size, 'callback should be called for each key');
	map.forEach(() => {
		t.pass();
	});

	t.end();
});

tap.test('ArrayMap.flatForEach', (t) => {
	let map = new ArrayMap<string, string>();
	map.set('a', ['a', 'b']);
	map.set('b', ['c']);

	t.plan(map.flatSize, 'callback should be called for each value in all arrays');
	map.flatForEach(() => {
		t.pass();
	});

	t.end();
});
