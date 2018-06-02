// @flow
'use strict';

const PrivateToken = Symbol('Option');

/**
 * Represents optional values. Instances of Option are either an instance of Some or the object None.
 */
export class Option<+A> {
    /**
     * Returns the option's value.
     */
    +get: () => A;

    /**
     * Returns true if the option is None, false otherwise.
     */
    +isEmpty: boolean;

    constructor($privateToken: typeof PrivateToken) {
        if ($privateToken !== PrivateToken) {
            throw new Error('Option cannot be manually instantiated. Use Option.of, Some or None.');
        }
    }

    /**
     * Returns true if the option is an instance of Some, false otherwise.
     */
    get isDefined(): boolean {
        return !this.isEmpty;
    }

    /**
     * Returns a Some containing the result of applying f to this Option's value if this Option is nonempty.
     */
    map<B>(f: A => B): Option<B> {
        return this.isEmpty ? None : Some(f(this.get()));
    }

    /**
     * Like map, but if resulting value is null, then returns None.
     */
    mapNullable<B>(f: A => ?B): Option<B> {
        return this.isEmpty ? None : Option.of(f(this.get()));
    }

    /**
     * Returns the result of applying f to this Option's value if this Option is nonempty. Returns None if this Option is empty. Slightly different from map in that f is expected to return an Option (which could be None).
     */
    flatMap<B>(f: A => Option<B>): Option<B> {
        return this.isEmpty ? None : f(this.get());
    }

    /**
     * Apply the given procedure f to the option's value, if it is nonempty.
     */
    forEach(f: A => any): void {
        if (!this.isEmpty) {
            f(this.get());
        }
    }

    /**
     * Returns this Option if it is nonempty and applying the predicate to this Option's value returns true.
     */
    filter(predicate: A => boolean): Option<A> {
        return this.isEmpty || predicate(this.get()) ? this : None;
    }

    /**
     * Returns the option's value if the option is nonempty, otherwise return the result of evaluating other.
     */
    getOrElse<B>(other: () => B): A | B {
        return this.isEmpty ? other() : this.get();
    }

    /**
     * Returns the option's value if the option is nonempty, otherwise return other.
     */
    getOrReturn<B>(other: B): A | B {
        return this.isEmpty ? other : this.get();
    }

    /**
     * Returns the option's value if the option is nonempty, otherwise returns undefined.
     */
    getOrUndefined(): A | void {
        return this.isEmpty ? undefined : this.get();
    }

    /**
     * Compares the option's value with other option's value and returns true when they match. None always matches other None.
     */
    equals<B>(other: Option<B>): boolean {
        return this.isDefined && other.isDefined ? this.get() === other.get() : this === other;
    }

    /**
     * An Option factory which creates Some(x) if the argument is not null, and None if it is null.
     */
    static of<V>(value?: ?V): Option<V> {
        return value == null ? None : Some(value);
    }

    static None: Option<empty>;

    static Some: <A>(value: A) => Option<A>;
}

class $None extends Option<empty> {
    get() {
        throw new Error('No such element');
    }

    get isEmpty(): boolean {
        return true;
    }
}

/** 
 * The empty None object.
 */
export const None: Option<empty> = new $None(PrivateToken);

Option.None = None;

class $Some<A> extends Option<A> {
    _value: A;

    constructor(value: A) {
        super(PrivateToken);
        this._value = value;
    }

    get(): A {
        return this._value;
    }

    get isEmpty(): boolean {
        return false;
    }
}

/**
 * Creates Some(x). Note that Some(null) is valid.
 */
export function Some<+A>(value: A): Option<A> {
    return new $Some(value);
}

Option.Some = Some;
