/**
 * Map wrapper for a map containing an array
 */
export class ArrayMap<K, V> {

	/** The default constructor for this type */
	public static [Symbol.species] = ArrayMap;

	/** Custom string tag implementation */
	public static [Symbol.toStringTag] = '[object ArrayMap]';



	/** The internal map */
	private map = new Map<K, V[]>();

	/** The default map iterator function is entries() */
	public [Symbol.iterator] = this.entries;


	/**
	 * @returns the number of elements in the map
	 */
	public get size() : number {
		return this.map.size;
	}

	/**
	 * @returns the total number of elements of all entries in the map
	 */
	public get flatSize() : number {
		let count = 0;
		for (let array of this.values()) {
			count += array.length;
		}

		return count;
	}


	/**
	 * Gets the values of an entry
	 *
	 * If the key is not set, returns an empty array
	 */
	public get(key : K) : V[] {
		let array = this.map.get(key);
		if (array === undefined) return [];
		return array;
	}

	/**
	 * Sets the values of an entry
	 *
	 * This overwrites any previous contents of the map.
	 *
	 * @param key   - Key of the entry
	 * @param value - The array to set
	 */
	public set(key : K, value : V[]) {
		this.map.set(key, value);
	}

	/**
	 * Checks if the map contains a key
	 *
	 * @param key - The key to check
	 *
	 * @returns True if the key has been set, false if not
	 */
	public has(key : K) : boolean {
		return this.map.has(key);
	}

	/**
	 * Adds one or more items to the end of the array of values of an entry
	 *
	 * If the key doesn't exist, it is created.
	 *
	 * @param key    - Key of the entry
	 * @param values - The value(s) to push to this entry
	 */
	public push(key : K, ...values : V[]) {
		let arr = this.get(key);
		arr.push(...values);
		this.set(key, arr);
	}

	/**
	 * Adds one or more items to the front of the array of values of an entry
	 *
	 * If the key doesn't exist, it is created.
	 *
	 * @param key    - Key of the entry
	 * @param values - The value(s) to push to this entry
	 */
	public unshift(key : K, ...values : V[]) {
		let arr = this.get(key);
		arr.unshift(...values);
		this.set(key, arr);
	}


	/**
	 * Deletes all entries in the map
	 */
	public clear() : void {
		this.map.clear();
	}

	/**
	 * Removes an entry from the map
	 *
	 * @param key - The key to remove
	 *
	 * @returns True if the element existed before removal, false if it did not
	 */
	public delete(key : K) : boolean {
		return this.map.delete(key);
	}


	/**
	 * Iterates over the keys of the map
	 *
	 * @returns An iterator with the keys of each element in the map
	 */
	public keys() : IterableIterator<K> {
		return this.map.keys();
	}

	/**
	 * Iterates over the values of the map
	 *
	 * @returns An iterator with the values of each element in the map
	 */
	public values() : IterableIterator<V[]> {
		return this.map.values();
	}

	/**
	 * Iterates over the flattened values of the map
	 *
	 * This method flattens the entries, so the iterator will contain each
	 * element from each entry separately.
	 *
	 * @returns An iterator with the values of each element in the map
	 */
	public *flatValues() : IterableIterator<V> {
		for (let array of this.values()) {
			for (let value of array) {
				yield value;
			}
		}
	}

	/**
	 * Iterates over the key/value pairs of the map
	 *
	 * @returns An iterator with the key/value pairs of each element in the map
	 */
	public entries() : IterableIterator<[K, V[]]> {
		return this.map.entries();
	}

	/**
	 * Iterates over flat key/value pairs of the map
	 *
	 * This method flattens the entries, so the iterator may contain the same
	 * key multiple times. It will also skip over empty arrays, since they
	 * contain no items.
	 *
	 * @returns An iterator with the flattened key/value pairs
	 */
	public *flatEntries() : IterableIterator<[K, V]> {
		for (let [key, array] of this.entries()) {
			for (let value of array) {
				yield [key, value];
			}
		}
	}


	/**
	 * Executes a callback for each entry in the map
	 *
	 * @param callback - Function to execute for each entry
	 */
	public forEach(callback : (value : V[], key : K, map : ArrayMap<K, V>) => void) {
		this.map.forEach((value, key) => callback(value, key, this));
	}

	/**
	 * Executes a callback for each flattened entry in the map
	 *
	 * This method flattens the entries, so the iterator may contain the same
	 * key multiple times. It will also skip over empty arrays, since they
	 * contain no items.
	 *
	 * @param callback - Function to execute for each flattened entry
	 */
	public flatForEach(callback : (value : V, key : K, map : ArrayMap<K, V>) => void) {
		this.map.forEach((array, key) => {
			for (let value of array) {
				callback(value, key, this)
			}
		});
	}
}
