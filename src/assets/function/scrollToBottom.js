export default function scrollToBottom(ele) {
    let chatDOM = document.querySelector(ele);
    if (chatDOM.scrollHeight > chatDOM.clientHeight) {
        chatDOM.scrollTop = chatDOM.scrollHeight;
    }
}