const TOP_ROW = [
  KEY_REVERSE,
  KEY_CLEAR,
  KEY_COPY,
]

const KEY_PAGES = {
  page0s: [
    TOP_ROW,
    [...'qwertyuiop'],
    [...'asdfghjkl'],
    [ 
      KEY_SHIFT0,
      ...'zxcvbnm',
      KEY_BACKSPACE,
    ],
    [
      KEY_NUM, ' ', KEY_RETURN
    ]
  ],
  page0S: [
    TOP_ROW,
    [...'QWERTYUIOP'],
    [...'ASDFGHJKL'],
    [ 
      KEY_UNSHIFT0,
      ...'ZXCVBNM',
      KEY_BACKSPACE,
    ],
    [
      KEY_NUM, ' ', KEY_RETURN
    ]
  ],
  
  page1s: [
    TOP_ROW,
    [...'1234567890'],
    [...'-/:;()$&@"'],
    [ 
      KEY_SHIFT1,
      ...'.,?!',KEY_APOSTROPHE,
      KEY_BACKSPACE,
    ],
    [
      KEY_ABC, ' ', KEY_RETURN
    ]
  ],
  page1S: [
    TOP_ROW,
    [...'[]{}#%^*+='],
    [...'_\\|~<>€£¥•'],
    [ 
      KEY_UNSHIFT1,
      ...'.,?!',KEY_APOSTROPHE,
      KEY_BACKSPACE,
    ],
    [
      KEY_ABC, ' ', KEY_RETURN
    ]
  ],
}