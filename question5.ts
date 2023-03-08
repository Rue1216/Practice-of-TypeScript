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
// 2. 使用 infer