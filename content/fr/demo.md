---
title: RxJS Primer
description: The curated topics and concepts that are commonly used in RxJS
topic: Programming
displayTopic: Programming
directory: programming
author:
  - name: Shaun Chong
    avatar: levi.png
tags:
  - reactive
  - rxjs
  - cheatsheet
updatedAt: 2022-11-18T11:37:49.432Z
createdAt: 2022-11-18T11:37:49.432Z
---

> This is an article that I wrote on my technical blog website ["book"](https://book-dun-three.vercel.app/programming/rxjs-primer) that I use it here to demonstrate contents generated.

<hr />

RxJS is a [ReactiveX](https://reactivex.io/) implementation in JavaScript. ReactiveX is an API for asynchronous programming with observable streams. There are many more implementations of ReactiveX in other languages such as [RxJava](https://github.com/ReactiveX/RxJava) for Java, [Rx.NET](https://github.com/dotnet/reactive) for C#, [RxSwift](https://github.com/ReactiveX/RxSwift) for Swift etc.

The streams of data encompasses database events, dom events and file uploads.

## Installation

RxJS can be installed by using any of the node package managers out there and [Yarn](https://yarnpkg.com) is used for demonstration here. In addition, using TypeScript is highly recommended as the strict typings can make the code more robust and easier to read.

```
yarn add rxjs
yarn add -D typescript ts-loader
```

If you are using [Webpack](https://webpack.js.org/) or other JavaScript bundler, make sure to configure the bundler to run accordingly and have a start script in `package.json` file.

```json [package.json]
{
  "scripts": {
    "start": "webpack-dev-server --mode development"
  }
}
```

## Angular

[Angular](https://angular.io/) is a JavaScript Framework developed by Google. RxJS can be used on the get-go as it is baked into Angular by default so there is no need for a seperate installation. All we need is just the [Angular CLI](https://angular.io/cli) to create a new project to work with.

```
ng new <your-project-name>
```

Start the project after the dependencies have been installed.

## Observable

It is a wrapper around a piece of data that can be subscribed to. The subscriber of that data will then get notified when there is changes on the data itself.

Observable literally means _"something that can be observed"_. It can also be think as a pipe of data.

The following code to create an observable is for demonstration purposes only. Observables can only be created in a useful way by some of the operators offered by RxJS library itself.

The code creates an observable that will send the `'hello'` text upon subscription.

```ts
import { Observable } from "rxjs";

var observable = Observable.create((observer) => {
  observer.next("hello");
  observer.next("hello");
});
```

To subscribe to the observer, use the `subscribe` method and it takes in one compulsory callback, and two optional callbacks as its argument.

```ts
var observer = observable.subscribe(
  (x) => console.log("onSuccess: ", x),
  (err) => console.error("onError", err),
  () => console.log("onComplete")
);
```

The subscription will activate the observable and 2 lines of `onSuccess: hello` should be appearing in the browser dev tools.

When the observer is marked as `complete`, it will be deactivated and no more data can be send through.

```ts
var observable = Observable.create((observer) => {
  observer.next("hey");
  observer.next("hey");
  observer.complete();
  observer.next("hey"); // not sent
});
```

### Creating Observables

As mentioned above, observables needs to be created with the officially endorsed way by RxJS. Here are some ways to create an observable.

```ts
import { Observable, of, from, interval, fromEvent } from "rxjs";
```

To wrap a raw value inside an observable, `of` can be used as it will only emit the value wrapped once and this is useful in software testing. However, there will be times that `of` can be useful in production code as well.

```ts
const hello$ = of("hello");

hello$.subscribe((x) => console.log(x)); // hello
```

Next, the `from` operator takes in an iterable and emits them one by one.

```ts
const hello$ = from("hello");

hello$.subscribe((x) => console.log(x)); // h, e, l, l, o
```

Next, the `fromEvent` operator is useful in composing events in DOM into observables. `fromEvent` takes in the DOM element as its first parameter and the event to be listened to as its second argument.

```ts
const event$ = fromEvent(document, "click");
event$.subscribe((x) => console.log(x));
```

Another observer creation method is `interval`, where it takes in the time inteval in miliseconds and perpetually emits an increment of integer by 1 starting from 0.

```ts
const periodic$ = interval(1000);

// 5 seconds passed
periodic$.subscribe((x) => console.log(x)); // 0, 1, 2, 3, 4
```

### Synchronous and Asynchronous

RxJS can be both synchronous and asynchronous.

```ts
const hello$ = of("hello");
hello$.subscribe((x) => console.log(x));
console.log("world");
```

The above code yields result of `'hello'` first and subsequently `'world'` because the code execute synchronously from top to bottom all within the main thread.

To make it asynchronous, `asyncScheduler` can be used.

```ts
import { asyncScheduler } from "rxjs";

const hello$ = of("hello", asyncScheduler);
hello$.subscribe((x) => console.log(x));
console.log("world");
```

The output is `'world'` followed by `'hello'` because the subscription only happens on the second iteration of the asynchronous event loop whereas the line to print `'world'` is already completed in the first event loop.

### Hot and Cold Observables

When the data is produced by the Observable itself, we call it a cold Observable. When the data is produced outside the Observable, we call it a hot Observable. Hot observables can have multiple subscriptions whereas cold observables can only have one subscription. If there are more than one subscription to a cold observable, the data obtained might differs.

Cold observables is lazy. They will not create the values until they are subscribed to it. Here is an example of cold observable.

```ts
const cold$ = Observable.create((observer) => observer.next(Math.random()));

cold$.subscribe(console.log); // 0.5
cold$.subscribe(console.log); // 0.89
```

However, this might not be useful in real life scenario and we want the data to be consistent. To achieve this, the cold observables needs to be converted into the hot observables.

The first way is to move the data generation outside the observable.

```ts
const random = Math.random();

const hot$ = Observable.create((observer) => observer.next(random));

hot$.subscribe(console.log); // 0.5
hot$.subscribe(console.log); // no value
```

The second subscriber receives no value because the data is already emitted when the first observer subscribe to it.

The other way to transform a cold observable to a hot observable is to use the `share` operator.

```ts
const cold$ = Observable.create((observer) => observer.next(Math.random()));

const hot$ = cold$.pipe(share());

hot$.subscribe(console.log); // 0.5
hot$.subscribe(console.log); // no value
```

To make the second subscriber to receive the last value emitted, `shareReplay` can be used to replace the `share` operator.

```ts
const cold$ = Observable.create((observer) => observer.next(Math.random()));

const hot$ = cold$.pipe(shareReplay());

hot$.subscribe(console.log); // 0.5
hot$.subscribe(console.log); // 0.5
```

## Subject

Subject is a different type of observable that can push values programmatically to it after the creation.

```ts
import { Subject } from "rxjs";

var subject = new Subject();
subject.subscribe(console.log);
subject.next("The first thing has been sent");

var observer = subject.subscribe(console.log);
subject.next("The second thing has been sent");
observer.unsubscribe();
subject.next("The third thing has been sent");
```

### Behaviour Subject

Behaviour subject will emit the last cached value upon new subsciption.

```ts
var subject = new BehaviorSubject("First");

subject.subscribe((data) => addItem("observer 1 ", data));
```

### Replay Subject

With behaviour subject, the late comers can only receive the last emitted item. However with replay subject, the late comers can receive $n$ amount of data upon subscription.

```ts
var subject = new ReplaySubject(3);

subject.next(1);
subject.next(2);
subject.subscribe(console.log); // 1, 2
subject.next(3); // 3
subject.next(4); // 4
subject.subscribe(console.log); // 2, 3, 4
```

### Async Subject

The simplest subject of all. It will only emit the last value upon completion.

```ts
var subject = new AsyncSubject();

subject.next(1);
subject.subscribe(console.log);
subject.complete(); // 1
```

## Operators

- Static Operators: These operators are usually used to create observables.
- Instance Operators: These methods on observable instance (majority of RxJS)

### Modifier Operators

These operator transform the existing value and modify the data flow.

```ts
import { map, filter, take, scan } from "rxjs/operators";

const source$ = from([1, 2, 3, 4, 5]);
const modified$ = source$.pipe(
  map((x) => x + 1), // 2, 3, 4, 5, 6
  scan((acc, val) => acc + val), // 2, 5, 9, 14, 20
  filter((x) => x > 10), // 14, 20
  take(1) // 14
);
```

### Pluck

A synthetic sugar for `map` to select only a certain keys in the array of object.

```ts
const list$ = of([
  {
    name: "Shino",
    age: 20,
    address: "Tokyo",
  },
  {
    name: "Anthony",
    age: 21,
    address: "Berkeley",
  },
]);

const names$ = list$.pipe(pluck("name"));

names$.subscribe(console.log); // 'Shino', 'Anthony'
```

### Tap

Tap operator allow side-effects to be triggered within the pipe.

```ts
source$.pipe(
  tap(console.log),
  map((x) => x.toUpperCase()),
  tap(async (x) => {
    await Promise.resolve();
    alert(x);
  })
);
```

### Handling Backpressure

Backpressure is the observables emitting of an **overwhelmingly large amount** of values than we actually need. An epitome would be the inflow of dom events triggered by mouse move.

The first strategy to handle this is to debounce the events. Debounce will not emit an event until the action has stopped for a period of time and this can be useful for typeahead when user is filling up an input field and a validation would only trigger after they have done typing.

```ts
import { fromEvent } from "rxjs";
import { debounceTime } from "rxjs/operators";

const event$ = fromEvent(document, "mousemove");

const debounced$ = event$.pipe(debounceTime(1000));
debounced$.subscribe(console.log);
```

Throttling the event can also be useful as the number of events are significantly reduced by a specified time interval. Throttling can be think as rate-limiting.

```ts
import { throttleTime } from "rxjs/operators";

const event$ = fromEvent(document, "mousemove");

const throttled$ = event$.pipe(throttleTime(1000));
throttled$.subscribe(console.log);
```

Buffer count on the other hand keeps all the event into an array and emit all of them at once when the buffer capacity has reached.

```ts
import { bufferCount } from "rxjs/operators";

const event$ = fromEvent(document, "mousemove");

const buffered$ = event$.pipe(bufferCount(10));
buffered$.subscribe(console.log);
```

### Switch Map

Switch map allows two relational observables to interoperate for data fetching.

```ts
const user$ = of({ uid: Math.random() });
const fetchOrders$ = (userId: number) => of(`${userId}'s order data'`);
```

First, we will need the user ID before we can fetch the order data. The intuitive way to do so is by nesting subscriptions.

```ts
user$.subscribe({ uid } => {
	fetchOrders$(uid).subscribe(console.log)
})
```

The better way to make relational calls is by using switch map.

```ts
const orders$ = user$.pipe(switchMap((user) => fetchOrders$(user.uid)));

orders$.subscribe(console.log);
```

### Combination Operators

There are multiple ways to combine observables. **Combine latest** takes in an array of observables, and will wait for all values in each independent observables to resolve their value and only emit all the values together as an array.

```ts
import { combineLatest } from "rxjs";
import { delay } from "rxjs/operators";

const randSync$ = Observable.create((o) => o.next(Math.random()));
const randAsync$ = randSync$.pipe(delay(1000));

const combined$ = combineLatest([randSync$, randAsync$]);

combined$.subscribe(console.log); // [0.5, 0.8]
```

**Merge** on the other hand fuse two observables into one to produce an ordinary observable.

```ts
import { merge } from "rxjs";
import { delay } from "rxjs/operators";

const randSync$ = Observable.create((o) => o.next(Math.random()));
const randAsync$ = randSync$.pipe(delay(1000));

const merged$ = merge([randSync$, randAsync$]);

merged$.subscribe(console.log); // 0.5, 0.8
```

**Skip until** can be used to ignore the source observable until the second observable emits a value.

```ts
var skipped$ = observable1$.skipUntil(observable2$);
```

### Error Handling

Error handling can be performed against observable inside the pipe. Retry mechanism can be implemented as well with the `retry` operator.

```ts
import { catchError, retry } from "rxjs/operators";

someObservable$.pipe(
  catchError((err) => of("default value")),
  retry(2)
);
```

## Memory Leaks

Remember to unsubscribe any of the long running observables.

```ts
const source$ = interval(100);

const subscription = source.subscribe((x) => {
  console.log(x);
  if (x > 10) {
    subscription.unsubscribe();
  }
});
```

A nicer way to handle this is to use `takeWhile` where it will stop emitting values when the conditions does not met anymore.

```ts
source$.pipe(takeWhile((x) => x <= 10));
```

To rely on another observables to stop emitting values instead, `takeUntil` can be used as once the other observable emits a value, the subscription to the current observable will automatically cancelled.

```ts
source$.pipe(takeUntil(of("something")));
```

## Resources

- [ReactiveX](https://reactivex.io/)
- [RxJS](https://rxjs.dev/)
- [RxJS Primer](https://www.learnrxjs.io/learn-rxjs/concepts/rxjs-primer)
- [RxJS Overview](https://rxjs-dev.firebaseapp.com/guide/overview)
- [Understanding hot vs cold Observables](https://luukgruijs.medium.com/understanding-hot-vs-cold-observables-62d04cf92e03)
- [RxJS Top Ten - Code This, Not That - YouTube](https://www.youtube.com/watch?v=ewcoEYS85Co)
