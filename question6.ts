// Define a NaiveFlat function
type NaiveFlat<T extends any[]> = unknown//

// TEST CASE 1
type NaiveResult = NaiveFlat<[['a'], ['b', 'c'], ['d']]>
// NaiveResult: 'a' | 'b' | 'c' | 'd'

// Define a DeepFlat function
type DeepFlat<T extends any[]> = unknown//

// TEST CASE 2
type Deep = [['a'], ['b', 'c'], [['d']], [[[['e']]]]];
type DeepTestResult = DeepFlat<Deep>  
// DeepTestResult: "a" | "b" | "c" | "d" | "e"