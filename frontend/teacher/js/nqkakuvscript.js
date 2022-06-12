
var node = document.getElementById("tablebody");

function clearTable(){
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
      }
}
