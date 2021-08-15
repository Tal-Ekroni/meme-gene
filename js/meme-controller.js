'use strict'


function onInit() {
    gElCanvas = document.getElementById('canvas');
    gCtx = gElCanvas.getContext('2d');
    document.querySelector('.edit').style.display='none'
    document.querySelector('.saved-memes').style.display='none'
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

function drawText(line) {
    if (!line.txt) return
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${line.stroke}`
    gCtx.fillStyle = `${line.color}`
    if (line.isSelected) {
        var textWidth = gCtx.measureText(line.txt).width;
        var lineHeight = line.size * 1.286;
        gCtx.textAlign = 'left';
        gCtx.textBaseline = 'top';
        gCtx.fillText(line.txt, line.posX, line.posY);
        gCtx.strokeText(line.txt, line.posX, line.posY)
        gCtx.strokeRect(line.posX, line.posY, textWidth, lineHeight);
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
    document.querySelector('.search').style.display='none'
    document.querySelector('.img-gallery').style.display='none'
    document.querySelector('.edit').style.display='flex'
    document.querySelector('.about').style.display='none'
    renderCanvas()


}
function drawImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

}

function onIncreaseFont() {
    increaseFont()
    renderCanvas()
}
function onDecreaseFont() {
    decreaseFont()
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

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}
function renderSavedMemes() {
    var savedMeme = loadFromStorage(KEY);
    var strHtmls = savedMeme.map(function (meme, idx) {
        return ` <div class="saved-memes"><img class="img-saved" onclick="onLoadSavedMeme(${idx})" src='${meme.img}'></div>`
    })
    var elSaved = document.querySelector('.saved-memes');
    elSaved.innerHTML = strHtmls.join('');
}


function onOpenSavedMemesGallery(){
    document.querySelector('.saved-memes').style.display='flex'
    document.querySelector('.img-gallery').style.display='none'
    document.querySelector('.about').style.display='none'
    document.querySelector('.edit').style.display='none'

    renderSavedMemes()
}
function onSave(){
    saveMeme()
}
function onLoadSavedMeme(idx) {
    var savedMemes = loadFromStorage(KEY);
    document.querySelector('.saved-memes').style.display='none'
    document.querySelector('.edit').style.display='flex'
    setSavedMeme(savedMemes[idx].meme);
    renderCanvas();
}

