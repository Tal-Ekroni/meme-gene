'use strict'


function onInit() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    document.querySelector('.edit').classList.toggle('hidden')
    renderGallery()
}

function renderCanvas() {
    const meme = getMeme()
    var img = new Image()
    img.src = getImgSrc()
    img.onload = () => {
        drawImg(img)
        meme.lines.forEach(function (line) {
            drawText(line)
        })
    }
}

function drawText(line ) {
    if (!line.txt) return
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${line.stroke}`
    gCtx.fillStyle = `${line.color}`
    if (line.isSelected) {
        gCtx.strokeStyle = 'green'
    }

    gCtx.fillText(line.txt, line.posX, line.posY);
    gCtx.strokeText(line.txt, line.posX, line.posY)
}

function onSetText(txt) {
    setText(txt)
    renderCanvas()
}
function renderGallery() {
    var imgs = onSearch()
    let strHtmls = imgs.map(img => {
        return `
        <img class="img" src="${img.url}" data-id="${img.id}" onclick="onEditImg(this)">        
        `
    })

    document.querySelector('.img-gallery').innerHTML = strHtmls.join('')
}

function onEditImg(el) {
    editImg(el)
    document.querySelector('.search').classList.toggle('hidden')
    document.querySelector('.img-gallery').classList.toggle('hidden')
    document.querySelector('.edit').classList.toggle('hidden')
    document.querySelector('.about').classList.toggle('hidden')
    renderCanvas()


}
function drawImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

}

function onIncreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx].size += 2
    renderCanvas()
}
function onDecreaseFont() {
    if (gMeme.lines[gMeme.selectedLineIdx].size === 2) return
    gMeme.lines[gMeme.selectedLineIdx].size -= 2
    renderCanvas()
}

function onMoveUp() {
    moveUp()
    renderCanvas()
}
function onMoveDown() {
    moveDown()
    renderCanvas()
}

function onSwitchLines() {
    switchLines()
    renderCanvas()
}

function onCreateLine() {
    createLine()
    renderCanvas()
    document.querySelector('.new-line').value = ''
}

function onDeleteLine() {
    deleteLine()
    renderCanvas()
}

function onAlign(x) {
    align(x)
    renderCanvas()
}


function onSelectFont(val) {
    selectFont(val)
    renderCanvas()
}

function onChangeColor(val) {
    changeColor(val)
    renderCanvas()
}

function onChangeStroke(val) {
    changeStroke(val)
    renderCanvas()
}

function onSearch() {
    return search()
}
function onDownloadImg(elLink) {
    renderCanvas()
    downloadImg(elLink)
}