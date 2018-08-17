# Description

Simply get rid of all nulls in your code.

This is a clone of Scala's Option class to be used with flow.js.

# Examples

```javascript
// @flow

let valueA = Option.of(null).map(x => x + 2).getOrElse(() => 0);
// valueA = 0

let valueB = Some('any object').flatMap(x => Some(`${x}!!!`)).getOrUndefined();
// valueB = 'any object!!!'

let valueC = Some(null).flatMap(() => Option.of(2)).map(x => x * 3).getOrElse(() => 0);
// valueC = 6

let valueD = Some(1).mapNullable(() => null).getOrReturn(-1);
// valueD = -1

Some(1).equals(Some(1))
// true

None.equals(None)
// true

Some('abc').equals(None)
// false

None.isDefined; // false
Some(1).isDefined; // true
Some(1).isEmpty; // false
Some(null).isEmpty; // false! Option<null> is valid!

Some('foo').get(); // 'foo'
None.get(); // throws an error, use getOrElse or getOrUndefined instead

Some(3).filter(x => x % 2 === 0); // None

Some('bar').forEach(x => {
    console.log(`my value: ${x}`);
});
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [Option](#option)
    -   [get](#get)
    -   [isEmpty](#isempty)
    -   [isDefined](#isdefined)
    -   [map](#map)
    -   [mapNullable](#mapnullable)
    -   [flatMap](#flatmap)
    -   [forEach](#foreach)
    -   [filter](#filter)
    -   [getOrElse](#getorelse)
    -   [getOrReturn](#getorreturn)
    -   [getOrUndefined](#getorundefined)
    -   [equals](#equals)
    -   [toJSON](#tojson)
    -   [of](#of)
    -   [None](#none)
    -   [Some](#some)
-   [None](#none-1)
-   [Some](#some-1)

## Option

Represents optional values. Instances of Option are either an instance of Some or the object None.

**Parameters**

-   `$privateToken` **any** 

### get

Returns the option's value.

Type: function (): A

### isEmpty

Returns true if the option is None, false otherwise.

Type: [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### isDefined

Returns true if the option is an instance of Some, false otherwise.

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### map

Returns a Some containing the result of applying f to this Option's value if this Option is nonempty.

**Parameters**

-   `f` **function (A): B** 

Returns **[Option](#option)&lt;B>** 

### mapNullable

Like map, but if resulting value is null, then returns None.

**Parameters**

-   `f` **function (A): B?** 

Returns **[Option](#option)&lt;B>** 

### flatMap

Returns the result of applying f to this Option's value if this Option is nonempty. Returns None if this Option is empty. Slightly different from map in that f is expected to return an Option (which could be None).

**Parameters**

-   `f` **function (A): [Option](#option)&lt;B>** 

Returns **[Option](#option)&lt;B>** 

### forEach

Apply the given procedure f to the option's value, if it is nonempty.

**Parameters**

-   `f` **function (A): any** 

Returns **void** 

### filter

Returns this Option if it is nonempty and applying the predicate to this Option's value returns true.

**Parameters**

-   `predicate` **function (A): [boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

Returns **[Option](#option)&lt;A>** 

### getOrElse

Returns the option's value if the option is nonempty, otherwise return the result of evaluating other.

**Parameters**

-   `other` **function (): B** 

Returns **(A | B)** 

### getOrReturn

Returns the option's value if the option is nonempty, otherwise return other.

**Parameters**

-   `other` **B** 

Returns **(A | B)** 

### getOrUndefined

Returns the option's value if the option is nonempty, otherwise returns undefined.

Returns **(A | void)** 

### equals

Compares the option's value with other option's value and returns true when they match. None always matches other None.

**Parameters**

-   `other` **[Option](#option)&lt;B>** 

Returns **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

### toJSON

Returns value if present, null otherwise. If value contains a method `toJSON`,
returns the result of method call.

Returns **any** 

### of

An Option factory which creates Some(x) if the argument is not null, and None if it is null.

**Parameters**

-   `value` **V?** 

Returns **[Option](#option)&lt;V>** 

### None

The empty None object

Type: [Option](#option)&lt;any>

### Some

Creates Some(x). Note that Some(null) is valid.

Type: function (value: A): [Option](#option)&lt;A>

## None

The empty None object.

Type: [Option](#option)&lt;any>

## Some

Creates Some(x). Note that Some(null) is valid.

**Parameters**

-   `value` **A** 

Returns **[Option](#option)&lt;A>** 
