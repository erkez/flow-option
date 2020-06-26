declare module '@ekz/option' {

    export class Option<A> {
        private constructor();
        get(): A;
        readonly isEmpty: boolean;
        readonly isDefined: boolean;
        map<B>(f: (value: A) => B): Option<B>;
        mapNullable<B>(f: (value: A) => B | null | void): Option<B>;
        flatMap<B>(f: (value: A) => Option<B>): Option<B>;
        forEach(f: (value: A) => any): void;
        filter(predicate: (value: A) => boolean): Option<A>;
        getOrElse<B>(other: () => B): A | B;
        getOrReturn<B>(other: B): A | B;
        getOrUndefined(): A | void;
        equals<B>(other: Option<B>): boolean;
        toJSON(): unknown;

        static of<V>(value?: V | null | void): Option<V>;

        static None: Option<never>;
        static Some<A>(value: A): Option<A>;
    }

    export const None: Option<never>;

    export function Some<A>(value: A): Option<A>;

}
