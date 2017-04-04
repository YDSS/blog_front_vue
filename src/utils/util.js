export function isMobile() {
    return window.screen.width < 600;
};

export function offsetFromAround($el) {
    if (!$el || typeof $el.getBoundingClientRect !== 'function') return null;

    return $el.getBoundingClientRect();
}
