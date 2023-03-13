import { BaseMap } from './BaseMap';

/**
 * A Map containing sets of items
 *
 * This class contains the standard `Map` methods as well as a subset of
 * `Set` methods for convenient access to the underlying set.
 *
 * ```ts
 * import { SetMap } from '@woubuc/multimap';
 *
 * let map = new SetMap();
 * map.add('foo', 1); // foo: Set(1)
 * map.add('foo', 2); // foo: Set(1, 2)
 * map.add('foo', 1); // foo: Set(1)
 * ```
 *
 * @typeParam TKey   - The keys in the map
 * @typeParam TValue - The individual entries in the sets
 */
export class SetMap<TKey, TValue> extends BaseMap<TKey, TValue, Set<TValue>> {
	/** @hidden The default constructor for this type */
	public static [Symbol.species] = SetMap;

	/** @hidden Custom string tag implementation */
	public static [Symbol.toStringTag] = '[object SetMap]';

	/** @override */
	public get(key: TKey): Set<TValue> {
		return this.map.get(key) ?? new Set();
	}

	/**
	 * Adds an item to the set at `key`.
	 *
	 * If no entry exists for `key`, creates a new set.
	 */
	public add(key: TKey, value: TValue) {
		let set = this.get(key);
		set.add(value);
		this.set(key, set);
	}

	/**
	 * Removes a specified item from the set, if it is in the set.
	 *
	 * If no entry exists for `key`, creates a new set.
	 */
	public deleteIn(key: TKey, value: TValue) {
		let set = this.get(key);
		set.delete(value);
		this.set(key, set);
	}


	/** @override */
	public get flatSize(): number {
		let count = 0;
		for (let set of this.values()) {
			count += set.size;
		}

		return count;
	}

	/** @override */
	public* flatValues(): IterableIterator<TValue> {
		for (let set of this.values()) {
			for (let value of set.values()) {
				yield value;
			}
		}
	}

	/** @override */
	public* flatEntries(): IterableIterator<[TKey, TValue]> {
		for (let [key, set] of this.entries()) {
			for (let value of set.values()) {
				yield [key, value];
			}
		}
	}
}
