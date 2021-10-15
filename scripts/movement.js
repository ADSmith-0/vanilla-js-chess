const allowDrop = e => e.preventDefault();
const drag = e => {
    const { id } = e.target.parentElement;
    e.dataTransfer.setData("text", id);
}
const drop = e => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(id).firstElementChild);
}