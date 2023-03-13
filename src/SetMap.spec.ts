import tap from 'tap';
import { SetMap } from './SetMap';

tap.test('SetMap.has', (t) => {
	let map = new SetMap<string, string>();
	map.set('has', new Set(['a']));

	t.equal(
		map.has('has'),
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

tap.test('SetMap.get', (t) => {
	let map = new SetMap<string, string>();
	map.set('get', new Set(['a', 'b']));

	t.same(
		map.get('get'),
		new Set(['a', 'b']),
		'should return the array for existing key',
	);
	t.same(
		map.get('nonexistent'),
		new Set(),
		'nonexistent key should return an empty array',
	);

	t.end();
});

tap.test('SetMap.delete', (t) => {
	let map = new SetMap<string, string>();
	map.set('delete', new Set(['a', 'b']));

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
		new Set(),
		'key should no longer exist in map',
	);
	t.equal(
		map.has('delete'),
		false,
		'key should no longer exist in map',
	);

	t.end();
});

tap.test('SetMap.clear', (t) => {
	let map = new SetMap<string, string>();
	map.set('clear', new Set(['a', 'b']));

	map.clear();
	t.same(
		map.get('clear'),
		new Set(),
		'values should be cleared',
	);

	t.end();
});

tap.test('SetMap.add', (t) => {
	let map = new SetMap<string, string>();

	map.add('add', 'a');
	t.same(
		map.get('add'),
		new Set(['a']),
		'should add the item to the set',
	);

	map.add('add', 'a');
	map.add('add', 'b');
	t.same(
		map.get('add'),
		new Set(['a', 'b']),
		'should not add duplicate items',
	);

	t.end();
});

tap.test('SetMap.deleteIn', (t) => {
	let map = new SetMap<string, string>();
	map.set('deleteIn', new Set(['a', 'b']));

	map.deleteIn('deleteIn', 'a');
	t.same(
		map.get('deleteIn'),
		new Set(['b']),
		'should delete the item from the given set',
	);

	t.end();
});

tap.test('SetMap.size', (t) => {
	let map = new SetMap<string, string>();
	map.set('a', new Set(['a', 'b']));
	map.set('b', new Set(['c']));

	t.equal(
		map.size,
		2,
		'should count the number of keys',
	);

	t.end();
});

tap.test('SetMap.flatSize', (t) => {
	let map = new SetMap<string, string>();
	map.set('a', new Set(['a', 'b']));
	map.set('b', new Set(['c']));

	t.equal(
		map.flatSize,
		3,
		'should count the items inside all sets',
	);

	t.end();
});

tap.test('SetMap.keys', (t) => {
	let map = new SetMap<string, string>();
	map.set('a', new Set(['a', 'b']));
	map.set('b', new Set(['c']));

	t.same(
		map.keys(),
		['a', 'b'],
		'should return the keys',
	);

	t.end();
});

tap.test('SetMap.values', (t) => {
	let map = new SetMap<string, string>();
	map.set('a', new Set(['a', 'b']));
	map.set('b', new Set(['c']));

	t.same(
		map.values(),
		[new Set(['a', 'b']), new Set(['c'])],
		'should return the sets',
	);

	t.end();
});

tap.test('SetMap.flatValues', (t) => {
	let map = new SetMap<string, string>();
	map.set('a', new Set(['a', 'b']));
	map.set('b', new Set(['c']));

	t.same(
		map.flatValues(),
		['a', 'b', 'c'],
		'should return the items inside all sets',
	);

	t.end();
});

tap.test('SetMap.entries', (t) => {
	let map = new SetMap<string, string>();
	map.set('a', new Set(['a', 'b']));
	map.set('b', new Set(['c']));

	t.same(
		map.entries(),
		[['a', new Set(['a', 'b'])], ['b', new Set(['c'])]],
		'should return the sets as key-value pais',
	);

	t.end();
});

tap.test('SetMap.flatEntries', (t) => {
	let map = new SetMap<string, string>();
	map.set('a', new Set(['a', 'b']));
	map.set('b', new Set(['c']));

	t.same(
		map.flatEntries(),
		[['a', 'a'], ['a', 'b'], ['b', 'c']],
		'should return the items inside all sets as key-value pairs, repeating the key as needed',
	);

	t.end();
});

tap.test('SetMap.forEach', (t) => {
	let map = new SetMap<string, string>();
	map.set('a', new Set(['a', 'b']));
	map.set('b', new Set(['c']));

	t.plan(map.size, 'callback should be called for each key');
	map.forEach(() => {
		t.pass();
	});

	t.end();
});

tap.test('SetMap.flatForEach', (t) => {
	let map = new SetMap<string, string>();
	map.set('a', new Set(['a', 'b']));
	map.set('b', new Set(['c']));

	t.plan(map.flatSize, 'callback should be called for each value in all sets');
	map.flatForEach(() => {
		t.pass();
	});

	t.end();
});

