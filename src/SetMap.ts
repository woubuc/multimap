/**
 * Map wrapper for a map containing a set
 */
export class SetMap<K, V> {

	/** The default constructor for this type */
	public static [Symbol.species] = SetMap;

	/** Custom string tag implementation */
	public static [Symbol.toStringTag] = '[object SetMap]';



	/** The internal map */
	private map = new Map<K, Set<V>>();

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
		for (let set of this.values()) {
			count += set.size;
		}

		return count;
	}


	/**
	 * Gets the values of an entry
	 *
	 * If the key is not set, returns an empty set
	 */
	public get(key : K) : Set<V> {
		let set = this.map.get(key);
		if (set === undefined) return new Set();
		return set;
	}

	/**
	 * Sets the values of an entry
	 *
	 * This overwrites any previous contents of the map at this key.
	 *
	 * @param key   - Key of the entry
	 * @param value - The set to set
	 */
	public set(key : K, value : Set<V>) {
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
	 * Adds one or more items to the set
	 *
	 * If the key doesn't exist, it is created.
	 *
	 * @param key    - Key of the entry
	 * @param values - The value(s) to push to this entry
	 */
	public add(key : K, ...values : V[]) {
		let set = this.get(key);
		for (let value of values) {
			set.add(value);
		}
		this.set(key, set);
	}

	/**
	 * Removes one or more items from the set
	 *
	 * If the key doesn't exist, it is created.
	 *
	 * @param key    - Key of the entry
	 * @param values - The value(s) to push to this entry
	 */
	public remove(key : K, ...values : V[]) {
		let set = this.get(key);
		for (let value of values) {
			set.delete(value);
		}
		this.set(key, set);
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
	public values() : IterableIterator<Set<V>> {
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
		for (let set of this.values()) {
			for (let value of set.values()) {
				yield value;
			}
		}
	}

	/**
	 * Iterates over the key/value pairs of the map
	 *
	 * @returns An iterator with the key/value pairs of each element in the map
	 */
	public entries() : IterableIterator<[K, Set<V>]> {
		return this.map.entries();
	}

	/**
	 * Iterates over flat key/value pairs of the map
	 *
	 * This method flattens the entries, so the iterator may contain the same
	 * key multiple times. It will also skip over empty sets, since they
	 * contain no items.
	 *
	 * @returns An iterator with the flattened key/value pairs
	 */
	public *flatEntries() : IterableIterator<[K, V]> {
		for (let [key, set] of this.entries()) {
			for (let value of set.values()) {
				yield [key, value];
			}
		}
	}


	/**
	 * Executes a callback for each entry in the map
	 *
	 * @param callback - Function to execute for each entry
	 */
	public forEach(callback : (value : Set<V>, key : K, map : SetMap<K, V>) => void) {
		this.map.forEach((value, key) => callback(value, key, this));
	}

	/**
	 * Executes a callback for each flattened entry in the map
	 *
	 * This method flattens the entries, so the iterator may contain the same
	 * key multiple times. It will also skip over empty sets, since they
	 * contain no items.
	 *
	 * @param callback - Function to execute for each flattened entry
	 */
	public flatForEach(callback : (value : V, key : K, map : SetMap<K, V>) => void) {
		this.map.forEach((set, key) => {
			for (let value of set.values()) {
				callback(value, key, this)
			}
		});
	}
}
