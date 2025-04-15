import { ref } from "vue";

export const useResize = (selector: string, minWidth: number, maxWidth: number) => {
    const resizingElement = ref<HTMLElement | null>(null)
    const startPosX = ref<number>(0)

    function startResizing(e: MouseEvent) {
        console.log('startResizing')
        const resizer = e.target as HTMLButtonElement;
        resizingElement.value = resizer.closest(selector) as HTMLElement;
        startPosX.value = e.clientX;

        document.addEventListener('mouseup', stopResizing);
        document.addEventListener('mousemove', resize);
    }

    function stopResizing(e: MouseEvent) {
        console.log('stopResizing')

        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResizing);
    }

    function resize(e: MouseEvent) {
        if (!resizingElement.value) return;
        const currentWidth = resizingElement.value.offsetWidth;
        const calculatedWidth = currentWidth + (e.clientX - startPosX.value);
        if (calculatedWidth < minWidth) return;
        if (calculatedWidth > maxWidth) return;

        const nextOrPrev = (resizingElement.value.nextSibling ? resizingElement.value.nextSibling : resizingElement.value.previousSibling) as HTMLElement;
        if (!nextOrPrev) return;

        if (e.clientX < startPosX.value) {
            resizingElement.value.style.width = `${currentWidth - (startPosX.value - e.clientX)}px`;
            nextOrPrev.style.width = `${nextOrPrev.offsetWidth + (startPosX.value - e.clientX)}px`;
        }

        if (e.clientX > startPosX.value) {
            resizingElement.value.style.width = `${currentWidth + (e.clientX - startPosX.value)}px`;
            nextOrPrev.style.width = `${nextOrPrev.offsetWidth - (e.clientX - startPosX.value)}px`;
        }
        startPosX.value = e.clientX;
    }

    return {
        startResizing,
        stopResizing,
        resize,
        resizingElement,
        startPosX
    }
}