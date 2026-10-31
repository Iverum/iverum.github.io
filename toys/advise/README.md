# advise

> A hacky toy vaguely based on the [Inform 7](https://ganelson.github.io/inform-website/) programming language.

This isn't a fully featured language (or maybe even a language at all), but more of a toy for me to tinker with and stretch my brain.

This README will serve as a syntax guide and a basic idea of what I'm working on here. We'll see how that goes for the moment. Expect this to be very work in progress and buggy.

## TODO

- [] Decide on the basic syntax we want to implement
- [] Build a basic test case
- [] Expand???

## Syntax

The basic structure of an Advise program is a set of statements and strings. All Advise programs should start with a string that is the title of the program.

### Strings

Strings in Advise are similar to what you'd find in most programming languages. They are started with a quote (") and end with a quote. They can contain any characters within them.

Strings are used to describe text that you want to display to the user of the program.

### Statements

Statements describe the objects in a Advise program. In this version of Advise the only types of objects are *rooms* and *items*.

A Room Statement is written as "<Room Name> is a room". A Room Statement can be followed with a String that will be used as the description for that room.

An Item Stateement is written as "There is a <Item Name> here". Items are automatically placed in the last room that was described. An Item Statement can be followed with a String that will be used as the description of that item.
