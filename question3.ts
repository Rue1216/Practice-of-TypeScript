// Partial(T) => 將某個類型內的屬性全變為可選項
// Example:
interface Todo {
    title: string,
    description: string,
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>){
    return {...todo, ...fieldsToUpdate}
}

// USED Tools
/* lib.es5.d.ts
type Partial<T> = {
    [P in keyof T]?: T[P] // 變成可選項
}

type Required<T> = {
    [P in keyof T]-?: T[P] // 移除可選項 === 留下必選項
}

type Pick<T, K extends keyof T> = { // 將某個屬性變成某系統的子屬性
    [P in K]: T[P];
}

type Exclude<T, U> = T extends U ? never: T // 將 T 中某些屬於 U 的類型移除掉

type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>> // 使用 T 類型中除了 K 類型的所有屬性
*/

// Requirements: change the given attributes to optional, create SetOptional & SetRequired
// test case
type Foo = {
    a: number,
    b?: string,
    c: boolean
}

type Simplify<T> = {
    [P in keyof T]: T[P]
}

// 1. set optional
type SetOptional<T, K extends keyof T> = Simplify<Partial<Pick<T,K>> & Pick<T, Exclude<keyof T, K>>>

type someOptional1 = SetOptional<Foo, 'a' | 'b'>
// results:
// type someOptional = {
//     a?: number, // changed to optional
//     b?: string, // remains the same
//     c: boolean
// }

// 2. set required
type SetRequired<T, K extends keyof T> = Simplify<Required<Pick<T,K>> & Pick<T, Exclude<keyof T, K>>>

type someOptional2 = SetRequired<Foo, 'b' | 'c'>
// results:
// type someOptional = {
//     a: number, 
//     b: string, // changed to required
//     c: boolean // remains the same
// }

// *可以使用 omit
type SetOptional_Omit<T, K extends keyof T> = Simplify<Partial<Pick<T,K>> & Omit<T,K>>
type SetRequired_Omit<T, K extends keyof T> = Simplify<Required<Pick<T,K>> & Omit<T,K>>