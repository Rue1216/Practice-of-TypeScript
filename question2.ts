// requirements
/*
1. params a, b are of the same type.
2. when the two parameters are not in the same type => throw error.
*/


type Combinator = string | number // union type

function f(a: Combinator, b: Combinator){
    if(typeof a === "string"){
        return a + ':' + b
    }else{
        return a + b
    }
}

// Error: Operator '+' cannot be applied to types 'number' and 'Combinator'.

f(2, 3); // Ok
f(1, 'a'); // Error
f('a', 2); // Error
f('a', 'b') // Ok


//  解法 1. TS Overload: 函數重載(不佳的作法)
type Combinator = string | number
function f(a: string,b: string): string
function f(a: number,b: number): number

function f(a: Combinator,b: Combinator): Combinator{
    if(typeof a === "string") return a+':'+b
    else return (a as number)+(b as number)
}

//  解法 2. 直接對函式定義，並使用 never 避免無窮盡(較佳的作法)
function f< T extends string | number >(a:T, b:T){
    if(typeof a === "string"){
        return a + ':' + b
    }else if(typeof a === 'number'){
        return (a as number) + (b as number)
    }else{
        const check: never = a
        return ''
    }
}