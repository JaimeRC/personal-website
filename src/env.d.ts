/// <reference types="astro/client" />
/// <reference path="../.astro/types.d.ts" />

// Bootstrap 5 no incluye tipos propios; declaramos las clases que usamos.
declare module 'bootstrap' {
    export class Tooltip {
        constructor(element: Element, options?: Record<string, unknown>);
        static getOrCreateInstance(element: Element, options?: Record<string, unknown>): Tooltip;
        dispose(): void;
    }
}