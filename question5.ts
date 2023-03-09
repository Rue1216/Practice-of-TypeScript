/* Type Extraction */
// Basics
type Person = {
    name: string;
    age: number;
}
type PersonName = Person["name"]; //string

type StrNumTuple = [string, number];
type StrNumTuple0 = StrNumTuple[0]; // string
type StrNumTuple1 = StrNumTuple[1]; // number

type NumArray = number[];
type NumArrayMember = NumArray[0]; // number

/* 
    1. The usage of extends: 
        T extends U? X:Y =>  若 T 能夠賦值給 U，類型是 X 否則為 Y
    2. The usage of infer: 聲明變量
 */
// example1
interface Dictionary<T= any> {
    [key: string] : T;
}
type StrDict = Dictionary<string>
type DicMember<T> = T extends Dictionary<infer V>? V : never
type StrDictMember = DicMember<StrDict> // string

// example2: async function
async function stringPromise(){
    return 'Hello, Rue!';
}
interface User {
    name: string;
    age: number;
}
async function userPromise(){
    return {name:'Rue', age: 23} as User;
}

type PromiseType<T> = (args: any[]) => Promise<T>;
type UnPromisify<T> = T extends PromiseType<infer U>? U: never; 

type extractStringPromise = UnPromisify<typeof stringPromise>; // string
type extractUserPromise = UnPromisify<typeof userPromise> // User

// define a tool 'AppendArgument' => 
// 1. add given parameter (of course with type) to an existing function.
// 2. the new adding parameter will be the first parameter of the new function.

/* for example
type Fn = (a: number, b: string) => number
type AppendArgument<F, A> = {
 //some code
}

type FinalFn = AppendArgument<Fn, boolean>
// (x: boolean, a: number, b: string) => number
 */

// 1. 使用 Parameters & ReturnType
// Parameters<T> 用於獲取函數參數類型組成、ReturnType<T> 用於獲取函數返回值的類型
type AppendArgument<F extends (...args: any) => any, A> = (x: A, ...args: Parameters<F>) => ReturnType<F>

/*
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R? R: any;
 */

// 2. 使用 infer 聲明變量
type AppendArgument_infer<F, T> = F extends (...args: infer Args) => infer Return? (x: T, ...args: Args) => Return : never


// TEST CASE
type Fn = (a: number, b: string) => number

type testFn1 = AppendArgument<Fn, boolean> //1. (x: boolean, a: number, b: string) => number
type testFn2 = AppendArgument_infer<Fn, string> //2. (x: string, a: number, b: string) => number