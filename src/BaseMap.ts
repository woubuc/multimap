export abstract class BaseMap<TKey, TValue, TCollection> {
	/** @hidden */
	public [Symbol.iterator] = this.entries;

	/** The internal map */
	protected map = new Map<TKey, TCollection>();


	/** The number of entries in the map */
	public get size(): number {
		return this.map.size;
	}

	/** Total number of elements across all collections in the map */
	public abstract get flatSize(): number;


	/**
	 * Gets the collection at `key`.
	 *
	 * If no entry exists for `key`, returns an empty collection.
	 */
	public abstract get(key: TKey): TCollection;

	/**
	 * Sets the collection at `key`.
	 *
	 * If no entry exists for `key`, returns an empty collection.
	 */
	public set(key: TKey, collection: TCollection) {
		this.map.set(key, collection);
	}

	/**
	 * Checks if `key` exists in the map.
	 */
	public has(key: TKey): boolean {
		return this.map.has(key);
	}


	/**
	 * Removes all entries from the map
	 */
	public clear(): void {
		this.map.clear();
	}

	/**
	 * Removes the collection at `key` from the map.
	 */
	public delete(key: TKey): boolean {
		return this.map.delete(key);
	}


	/**
	 * Iterates over the keys of the map
	 */
	public keys(): IterableIterator<TKey> {
		return this.map.keys();
	}

	/**
	 * Iterates over the values of the map
	 */
	public values(): IterableIterator<TCollection> {
		return this.map.values();
	}

	/**
	 * Iterates over the values in all collections in the map.
	 *
	 * This method flattens the entries, so the iterator will contain each
	 * element from each entry separately.
	 */
	public abstract flatValues(): IterableIterator<TValue>;

	/**
	 * Iterates over the key/value pairs of the map.
	 */
	public entries(): IterableIterator<[TKey, TCollection]> {
		return this.map.entries();
	}

	/**
	 * Iterates over all key/value pairs in all collections in the map.
	 *
	 * This method flattens the entries, so the iterator may contain the same
	 * key multiple times. It will also skip over empty collections.
	 */
	public abstract flatEntries(): IterableIterator<[TKey, TValue]>;


	/**
	 * Executes a callback for each entry in the map
	 */
	public forEach(callback: (value: TCollection, key: TKey, map: this) => void) {
		this.map.forEach((value, key) => {
			callback(value, key, this);
		});
	}

	/**
	 * Executes a callback for all items in all collections in the map.
	 *
	 * This method flattens the entries, so the iterator may contain the same
	 * key multiple times. It will also skip over empty collections.
	 */
	public flatForEach(callback: (value: TValue, key: TKey, map: this) => void) {
		for (let [key, value] of this.flatEntries()) {
			callback(value, key, this);
		}
	}
}
