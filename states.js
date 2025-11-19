const STATE = {
  shiftOn: false,
  capsLock: false,
  reverseMode: localStorage.getItem('reverseMode') == 1,
  textSpace: '',
  page: 0,
  backspace: {
    active: false,
    heldAt: 0,
    pressedCount: 0,
  }
}

if(STATE.reverseMode === null) {
  localStorage.setItem('reverseMode', 0)
}