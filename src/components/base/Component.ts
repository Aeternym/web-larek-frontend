import { IEvents } from "./events";

export abstract class Component<T> {
    protected constructor(protected readonly container: HTMLElement, protected events: IEvents) {
    }

    toggleClass(element: HTMLElement, className: string, force?: boolean) {
        element.classList.toggle(className, force);
    }

    protected setText(element: HTMLElement, value: unknown) {
        if (element) {
            element.textContent = String(value);
        }
    }

    setDisabled(element: HTMLElement, state: boolean) {
        if (element) {
            if (state) element.setAttribute('disabled', 'disabled');
            else element.removeAttribute('disabled');
        }
    }

    protected setHidden(element: HTMLElement) {
        element.style.display = 'none';
    }

    protected setVisible(element: HTMLElement) {
        element.style.removeProperty('display');
    }

    protected setImage(element: HTMLImageElement, src: string, alt?: string) {
        if (element) {
            element.src = src;
            if (alt) {
                element.alt = alt;
            }
        }
    }

    render(data?: Partial<T>): HTMLElement {
        Object.assign(this as object, data ?? {});
        return this.container;
    }
}

export const isModel = (obj: unknown): obj is Model<any> => {
    return obj instanceof Model;
}

export abstract class Model<T> {
    constructor(data: Partial<T>, protected events: IEvents) {
        Object.assign(this, data);
    }
    emitChanges(event: string, payload?: object) {
        this.events.emit(event, payload ?? {});
    }
}