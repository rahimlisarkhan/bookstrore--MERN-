export interface ResponseType<T> {
    messages: string,
    headers: any,
    config: any,
    status:number,
    statusText:string,
    request:any
    data: {
        messages?: string,
        result?: {
            data?: T
        }
    }

}
