let msg:HTMLParagraphElement
const html = `<h3>This is message</h3>
  <div id="content">wait...</div>`

window.addEventListener('load',()=>{
  msg = document.querySelector('#msg')
  msg.innerHTML = html
  const content:HTMLDivElement = document.querySelector('#content')
  setDiv(content)
})

const addElement = function(event:MouseEvent) {
  const div:HTMLDivElement = document.createElement('div')
  div.style.position = "absolute"
  div.style.width = "50px"
  div.style.height = "50px"
  div.style.left = event.offsetX - 25 + "px"
  div.style.top = event.offsetY - 25 + "px"
  div.style.backgroundColor = "#cc00aa33"
  const target:HTMLElement = event.target as HTMLElement
  target.appendChild(div)
}

function setDiv(content:HTMLDivElement) {
  content.style.position = "absolute"
  content.style.left = "100px"
  content.style.top = "100px"
  content.style.width ="300px"
  content.style.height = "300px"
  content.style.borderWidth = "3px"
  content.style.borderStyle = "solid"
  content.style.borderColor = "red"
  content.style.backgroundColor = "white"
  content.textContent = ""
  content.addEventListener('click', addElement)
}