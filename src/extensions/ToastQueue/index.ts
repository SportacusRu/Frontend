class ToastNode {
    public readonly message: string;
    public readonly next?: ToastNode;

    constructor({ message, next }: { message: string, next?: ToastNode }) {
        this.message = message;
        this.next = next;
    }
}

export class ToastQueue {
    private _start: ToastNode | undefined;
    private _tail: ToastNode | undefined;


    public add(message: string) {
        {
            if (this._start === undefined) {
                const newNode = new ToastNode({ message: message });
                this._start = newNode;
                this._tail = newNode;
            } else {
                this._tail = new ToastNode({ message: message, next: this._tail }); 
            }
        }
    }
    public peek() : string | undefined {
        return this._start?.message;
    }
    public pop() : string | undefined {
        const message = this._start?.message;
        this._start = this._start?.next;
        return message;
    }
}