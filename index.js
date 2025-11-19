document.ondblclick = e => e.preventDefault();

const keyboard = document.getElementById('keyboard')
const textSpace = document.getElementById('textSpace')
const toasts = document.getElementById('toasts')
const capsLockCont = document.getElementById('capsLockContainer')

let idklol = 0
setInterval(()=>{
  renderTextspace((++idklol) % 2)
},300)

function renderTextspace(showCursor = true) {
  textSpace.textContent = STATE.textSpace + (showCursor?'\u200b|':'')
}
function updateTextspace(newStr) {
  STATE.textSpace = newStr
  renderTextspace()
}
function showPreview(keyId) {
  const keyEle = document.getElementById(keyId)
  if(keyEle && !keyEle.classList.contains('unicode32')) {
    const previewEle = document.getElementById('keyPreview') || document.createElement('div')
    previewEle.id = 'keyPreview'
    previewEle.textContent = keyEle.textContent
    keyEle.appendChild(previewEle)
  }
}
function hidePreview() {
  const previewEle = document.getElementById('keyPreview')
  if(!previewEle) return
  previewEle.remove()
}

function showPage() {
  const page = STATE.page
  const pageId = `page${page}${STATE.shiftOn?'S':'s'}`
  const rows = KEY_PAGES[pageId]

  keyboard.innerHTML = '';
  keyboard.className = '';
  keyboard.classList.add(pageId)

  capsLockCont.classList[STATE.capsLock?'add':'remove']('on')

  rows.map((row,idx) => {
    const rowEle = document.createElement('div')
    rowEle.classList.add('kbRow', `row${idx}`)
    row.map((key,iidx) => {
      const keyEle = document.createElement('div')
      keyEle.classList.add('kbKey')
      keyEle.innerHTML = typeof key === 'string'? key : key.label
      const serial = `${idx}_${iidx}`
      keyEle.id = `${pageId}-key${serial}`

      keyEle.ontouchstart = () => {
        document.getElementById(keyEle.id).classList.add('pressing')
        showPreview(keyEle.id)
      }
      keyEle.ontouchend = () => {
        document.getElementById(keyEle.id).classList.remove('pressing')
        hidePreview()
      }


      if(typeof key === 'string') {
        keyEle.classList.add(`unicode${key.charCodeAt()}`)
        keyEle.ontouchend = () => {
          document.getElementById(keyEle.id).classList.remove('pressing')
          hidePreview()
          STATE.textSpace += key
          renderTextspace()
          if(STATE.shiftOn && !STATE.capsLock) {
            STATE.shiftOn = false
            showPage()
          }
        }
      } else {
        if(key.trigger) {
          if(key.dynamicWidth) keyEle.classList.add('dynamicWidth')
          keyEle.classList.add('special')
          keyEle.ontouchstart = () => {
            key.trigger()
            document.getElementById(keyEle.id)?.classList.add('pressing')
            if(key.clickToCopy) {
              keyEle.classList.add('clickToCopy')
            }
          }
          keyEle.ontouchend = () => {
            document.getElementById(keyEle.id)?.classList.remove('pressing')
            if(key.release) key.release()
          }
        }
      }

      rowEle.appendChild(keyEle)
    })
    keyboard.appendChild(rowEle)
  })
}

function toast(text) {
  const toastEle = document.createElement('div')
  toastEle.classList = 'toast'
  toastEle.textContent = text
  toasts.appendChild(toastEle)
  setTimeout(()=>{
    toastEle.remove()
  },2000)
}

// updateTextspace('Example text.')
showPage()

new ClipboardJS('.clickToCopy', {
  text: function(a) {
    toast('Copied!')
    return STATE.textSpace
  }
})