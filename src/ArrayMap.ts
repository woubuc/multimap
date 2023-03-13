import { BaseMap } from './BaseMap';

/**
 * A Map containing arrays of items
 *
 * This class contains the standard `Map` methods as well as a subset of
 * `Array` methods for convenient access to the underlying array.
 *
 * ```ts
 * import { ArrayMap } from '@woubuc/multimap';
 *
 * let map = new ArrayMap();
 * map.set('foo', [1]); // foo: [1]
 * map.push('foo', 2); // foo: [1, 2]
 * map.delete('foo'); // foo: undefined
 * map.push('foo', 3); // foo: [3]
 * ```
 *
 * @typeParam TKey   - The keys in the map
 * @typeParam TValue - The individual items in the arrays
 */
export class ArrayMap<TKey, TValue> extends BaseMap<TKey, TValue, TValue[]> {
	/** @hidden The default constructor for this type */
	public static [Symbol.species] = ArrayMap;

	/** @hidden Custom string tag implementation */
	public static [Symbol.toStringTag] = '[object ArrayMap]';

	/**
	 * Adds one or more items to the end of the array at `key`.
	 *
	 * If no entry exists for `key`, creates a new array.
	 */
	public push(key: TKey, ...values: TValue[]) {
		let arr = this.get(key);
		arr.push(...values);
		this.set(key, arr);
	}

	/**
	 * Removes the last element from the array at `key`.
	 *
	 * If no entry exists for `key`, creates a new array.
	 */
	public pop(key: TKey): TValue | undefined {
		let arr = this.get(key);
		let value = arr.pop();
		this.set(key, arr);
		return value;
	}

	/**
	 * Removes the first element from the array at `key` and returns the removed element.
	 *
	 * If no entry exists for `key`, creates a new array.
	 */
	public shift(key: TKey): TValue | undefined {
		let arr = this.get(key);
		let value = arr.shift();
		this.set(key, arr);
		return value;
	}

	/**
	 * Adds one or more items to the beginning of the array at `key`.
	 *
	 * If no entry exists for `key`, creates a new array.
	 */
	public unshift(key: TKey, ...values: TValue[]) {
		let arr = this.get(key);
		arr.unshift(...values);
		this.set(key, arr);
	}

	/**
	 * Sorts the elements of the array at `key` in place, with an optional
	 * compare function.
	 *
	 * Uses the standard `Array.sort()` functionality so the same complexity
	 * and considerations apply.
	 *
	 * If no entry exists for `key`, creates a new array.
	 */
	public sort(key: TKey, compareFn?: (a: TValue, b: TValue) => number): void {
		let arr = this.get(key);
		arr.sort(compareFn);
		this.set(key, arr);
	}

	/**
	 * Reverses the array at `key` in place.
	 *
	 * If no entry exists for `key`, creates a new array.
	 */
	public reverse(key: TKey): void {
		let arr = this.get(key);
		arr.reverse();
		this.set(key, arr);
	}


	/** @override */
	public get flatSize(): number {
		let count = 0;
		for (let array of this.values()) {
			count += array.length;
		}

		return count;
	}

	/** @override */
	public get(key: TKey): TValue[] {
		return this.map.get(key) ?? [];
	}

	/** @override */
	public* flatValues(): IterableIterator<TValue> {
		for (let array of this.values()) {
			for (let value of array) {
				yield value;
			}
		}
	}

	/** @override */
	public* flatEntries(): IterableIterator<[TKey, TValue]> {
		for (let [key, array] of this.entries()) {
			for (let value of array) {
				yield [key, value];
			}
		}
	}
}
