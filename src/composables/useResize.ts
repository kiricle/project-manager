import { ref } from "vue";

export const useResize = (selector: string) => {
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
        if (calculatedWidth < 100) return;
        if (calculatedWidth > 500) return;

        if (e.clientX < startPosX.value) { 
            resizingElement.value.style.width = `${currentWidth - (startPosX.value - e.clientX)}px`;
        }

        resizingElement.value.style.width = `${currentWidth + (e.clientX - startPosX.value)}px`;
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