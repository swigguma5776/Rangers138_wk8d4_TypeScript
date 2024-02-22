type Category = 'personal' | 'work' | 'health' | 'home' | 'other' | 'finance' // literal union type

// Generic Type 
interface Managing<T> {
    addTask(param: T):void
    removeTask(param: T):void
}

export {
    Category,
    Managing
}