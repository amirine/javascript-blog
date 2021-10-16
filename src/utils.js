export function isGossipLengthValid(str_value) {
    // Function checking gossip input length
    return str_value.length >= 8
}

export function createModalWindow(title, content) {
    // Function creating new modal window with the title {title} and content {content}
    const modalWindow = document.createElement('div');
    modalWindow.classList.add('modalWindow');

    modalWindow.innerHTML = `
    <h1>${title}</h1>
    <div class id="modal-window-content">${content}</div>
    `;
    mui.overlay('on', modalWindow);
}
