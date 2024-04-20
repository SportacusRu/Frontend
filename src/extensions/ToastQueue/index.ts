import React, { useState } from "react";

export type ToastNode = {
    value: string,
    id: number,
}

export class ToastQueue {
    public queue: ToastNode[] = []
    private setQueue: React.Dispatch<React.SetStateAction<ToastNode[]>>;
    
    constructor() {
        [this.queue, this.setQueue] = useState<ToastNode[]>([]);
    }

    public add(message: string) {
        if (this.queue.length < 1) {
            this.setQueue([...this.queue, {value: message, id: this.queue.length}]);
        }
    }
    public peek() : ToastNode {
        return this.queue[0];
    }

    public pop() : ToastNode {
        const item = this.queue[0];
        this.setQueue(this.queue.filter((i) => i.id != item.id));
        return item
    }
}