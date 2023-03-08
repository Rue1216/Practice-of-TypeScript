// the usage of Pick
interface Todo {
    title: string
    description: string
    completed: boolean
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>

const todo: TodoPreview = {
    title: 'clean room',
    completed: false,
}

// example
interface Example {
    a: string;
    b: string | number;
    c: ()=> void;
    d: {};
}

//type StringKeyOnly = ConditionalPick<Example, string>
//=> {a: string}

/*
1. 先用 keyof 拿到類型的所有的 key
2. 用 as 過濾這些 key
*/

type ConditionalPick<T,V> = {
    [P in keyof T as (T[P] extends V? P : never)] : T[P];
}
type StringKeyOnly = ConditionalPick<Example, string>
/*
type StringKeyOnly = {
    a: string
}
 */