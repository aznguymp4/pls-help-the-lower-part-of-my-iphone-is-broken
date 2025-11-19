const KEY_SHIFT0 = {
  label: '⇧',
  trigger: () => {
    STATE.shiftOn = true
    STATE.capsLock = false
    showPage()
  }
}
const KEY_UNSHIFT0 = {
  label: '⇪',
  trigger: () => {
    if(STATE.capsLock || (STATE.page!==0)) {
      STATE.shiftOn = false
      STATE.capsLock = false
    } else {
      STATE.shiftOn = true
      STATE.capsLock = true
    }
    showPage()
  }
}
const KEY_SHIFT1 = {
  label: '#+=',
  trigger: () => {
    STATE.shiftOn = true
    showPage()
  }
}
const KEY_UNSHIFT1 = {
  label: '123',
  trigger: () => {
    STATE.shiftOn = false
    showPage()
  }
}
const KEY_BACKSPACE = {
  label: '⌫',
  trigger: () => {
    if(!STATE.textSpace) return;
    STATE.backspace.active = true
    STATE.backspace.heldAt = Date.now()
    STATE.backspace.pressedCount++
    const thisPressCt = STATE.backspace.pressedCount+0
    
    const deleteLastChar = () => updateTextspace(STATE.textSpace.substring(0, STATE.textSpace.length-1))
    deleteLastChar()

    setTimeout(()=>{
      if(STATE.backspace.active && (thisPressCt === STATE.backspace.pressedCount)) {
        let backspaceARR 
        backspaceARR = setInterval(()=>{
          if(STATE.textSpace && STATE.backspace.active) return deleteLastChar()
          clearInterval(backspaceARR)
        }, 45)
      }
    }, 340)
  },
  release: () => {
    STATE.backspace.active = false
  }
}
const KEY_RETURN = {
  label: 'return',
  trigger: () => {
    updateTextspace(STATE.textSpace + '\n')
  }
}
const KEY_APOSTROPHE = {
  label: "'",
  trigger: () => {
    updateTextspace(STATE.textSpace + "'")
    STATE.page = 0
    STATE.capsLock = false
    STATE.shiftOn = false
    showPage()
  }
}
const KEY_NUM = {
  label: '123',
  trigger: () => {
    STATE.page = 1
    STATE.capsLock = false
    STATE.shiftOn = false
    showPage()
  }
}
const KEY_ABC = {
  label: 'ABC',
  trigger: () => {
    STATE.page = 0
    STATE.capsLock = false
    STATE.shiftOn = false
    showPage()
  }
}
const KEY_COPY = {
  label: 'Copy',
  dynamicWidth: true,
  clickToCopy: true,
  trigger: () => {
    
  }
}
const KEY_CLEAR = {
  label: 'Clear',
  dynamicWidth: true,
  trigger: () => {
    updateTextspace('')
  }
}
const KEY_REVERSE = {
  label: 'Toggle Reverse',
  dynamicWidth: true,
  trigger: () => {
    STATE.reverseMode = !STATE.reverseMode
    localStorage.setItem('reverseMode', STATE.reverseMode?1:0)
    document.body.classList[STATE.reverseMode?'add':'remove']('reverse')
  }
}