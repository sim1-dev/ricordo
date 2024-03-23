export interface Crud<T> {
    getAll(): Promise<T[]>

    find(id: number): Promise<T | undefined>

    add(item: T): Promise<T[]>

    saveAll(items: T[]): Promise<T[]>

    update(item: T): Promise<T[]>

    remove(id: number): Promise<T[]>

    //remove(item: T): Promise<T[]>

    reset(): Promise<T[]>
}