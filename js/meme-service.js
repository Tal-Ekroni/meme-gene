'use strict'
var gElCanvas
var startingX
var startingY
var gCtx
var startingX
var startingY

var gImgs = [
    { id: 1, url: 'images/1.jpg', keywords: ['politics', 'angry'] },
    { id: 2, url: 'images/2.jpg', keywords: ['cute', 'dog'] },
    { id: 3, url: 'images/3.jpg', keywords: ['cute', 'baby', 'dog'] },
    { id: 4, url: 'images/4.jpg', keywords: ['cute', 'cat'] },
    { id: 5, url: 'images/5.jpg', keywords: ['baby', 'angry'] },
    { id: 6, url: 'images/6.jpg', keywords: ['explain'] },
    { id: 7, url: 'images/7.jpg', keywords: ['surprised'] },
    { id: 8, url: 'images/8.jpg', keywords: ['listen'] },
    { id: 9, url: 'images/9.jpg', keywords: ['happy', 'funny'] },
    { id: 10, url: 'images/10.jpg', keywords: ['happy', 'funny', 'politics'] },
    { id: 11, url: 'images/11.jpg', keywords: ['sport'] },
    { id: 12, url: 'images/12.jpg', keywords: ['you'] },
    { id: 13, url: 'images/13.jpg', keywords: ['cheers'] },
    { id: 14, url: 'images/14.jpg', keywords: ['scary'] },
    { id: 15, url: 'images/15.jpg', keywords: ['smile'] },
    { id: 16, url: 'images/16.jpg', keywords: ['laugh'] },
    { id: 17, url: 'images/17.jpg', keywords: ['politics'] },
    { id: 18, url: 'images/18.jpg', keywords: ['vision'] }];
var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Your Text Here',
            size: 24,
            align: 'left',
            color: 'white',
            font: 'Impact',
            stroke: 'black',
            posX: startingX,
            posY: startingY,
            isSelected: true
        }
    ]
}

function getImgSrc() {
    var img = gImgs.find(function (img) {
        return gMeme.selectedImgId === img.id
    })
    return img.url
}

function getTxt() {
    return gMeme.lines[gMeme.selectedLineIdx].txt
}
function getSize() {
    return gMeme.lines[gMeme.selectedLineIdx].size
}
function setText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}


function editImg(el) {
    gMeme.selectedImgId = +(el.dataset.id)
}


function createLine() {
    var line = {
        txt: 'Your Text Here',
        size: 24,
        align: 'left',
        color: 'white',
        font: 'Impact',
        stroke: 'black',
        posX: startingX,
        posY: startingY,
        isSelected: true
    }
    if (gMeme.selectedLineIdx ===0) {
        line.posX=80
        line.posY=20
    }
    if (gMeme.selectedLineIdx ===1) {
        line.posX=80
        line.posY=260
    }
    gMeme.lines.push(line)
    gMeme.lines[gMeme.lines.length - 2].isSelected = false
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function switchLines() {


    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx === gMeme.lines.length) {
        gMeme.selectedLineIdx = 0;
    }
    gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    if (gMeme.selectedLineIdx === 0) {
        gMeme.lines[gMeme.lines.length - 1].isSelected = false;
    } else {
        gMeme.lines[gMeme.selectedLineIdx - 1].isSelected = false;
    }
    console.log(gMeme.selectedLineIdx);

}

function getSelectedLine() {
    return gMeme.lines.findIndex(function (line) {
        return line.isSelected
    })
}
function getMeme() {
    return gMeme
}

function deleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
}

function align(x) {
    gMeme.lines[gMeme.selectedLineIdx].posX = x
}
function selectFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].font = val
}
function changeColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].color = val
}

function changeStroke(val) {
    gMeme.lines[gMeme.selectedLineIdx].stroke = val
}

function search() {
    // let elSearch = document.querySelector('[name=search-meme]');
    let elSearch = document.getElementsByName('search-meme')[0];
    let searchWord = elSearch.value;
    let filterdImgs = gImgs.filter(img => {
        return img.keywords.includes(searchWord);
    })
    if (!filterdImgs.length) {
        return gImgs;
    }
    return filterdImgs;
}

