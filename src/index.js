// @flow
'use strict';

const PrivateToken = Symbol('Option');

export class Option<+A> {
    +get: () => A;
    +isEmpty: boolean;

    constructor($privateToken: typeof PrivateToken) {
        if ($privateToken !== PrivateToken) {
            throw new Error('Option cannot be manually instantiated. Use Option.of, Some or None.');
        }
    }

    get isDefined(): boolean {
        return !this.isEmpty;
    }

    map<B>(f: A => B): Option<B> {
        return this.isEmpty ? None : Some(f(this.get()));
    }

    mapNullable<B>(f: A => ?B): Option<B> {
        return this.isEmpty ? None : Option.of(f(this.get()));
    }

    flatMap<B>(f: A => Option<B>): Option<B> {
        return this.isEmpty ? None : f(this.get());
    }

    forEach(f: A => any): void {
        if (!this.isEmpty) {
            f(this.get());
        }
    }

    filter(predicate: A => boolean): Option<A> {
        return this.isEmpty || predicate(this.get()) ? this : None;
    }

    getOrElse<B>(other: () => B): A | B {
        return this.isEmpty ? other() : this.get();
    }

    getOrUndefined(): A | void {
        return this.isEmpty ? undefined : this.get();
    }

    static of<V>(value?: ?V): Option<V> {
        return value == null ? None : Some(value);
    }
}

class $None extends Option<empty> {
    get() {
        throw new Error('No such element');
    }

    get isEmpty(): boolean {
        return true;
    }
}

export const None: Option<empty> = new $None(PrivateToken);

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

export function Some<+A>(value: A): Option<A> {
    return new $Some(value);
}
