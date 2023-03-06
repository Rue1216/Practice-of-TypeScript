type User = {
    id: number,
    kind: string
}

function makeCustomer<T extends User>(u: T):T{
    return {
        id: u.id,
        kind: 'customer'
    }
}

// Error
/*
Type '{ id: number; kind: string; }' is not assignable to type 'T'.
'{ id: number; kind: string; }' is assignable to the constraint of type 'T', but 'T' could be instantiated with a different subtype of constraint 'User'.
*/

// 1. T => 需要兼容 User 的類型 => 回傳時須多帶解構之 user

function makeCustomer<T extends User>(u: T):T{
    return {
        ...u,
        id: u.id,
        kind: 'customer'
    }
}


// 2. 限制回傳為 User 的類型

function makeCustomer<T extends User>(u: T): User{
    return {
        id: u.id,
        kind: 'customer'
    }
}


// 3. 如果只想返回 id & kind => 使用 pick

function makeCustomer<T extends User>(u: T): Pick<T, keyof User>{
    return {
        id: u.id,
        kind: 'customer'
    }
}

console.log(makeCustomer({id: 1, kind: 'rue', name: 'someone'})); // {id: 1, kind: 'rue'}
