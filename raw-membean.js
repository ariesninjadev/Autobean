

function getCookie(t){let e=t+'=',n=decodeURIComponent(document.cookie).split(';');for(let r=0;r<n.length;r++){let i=n[r];for(;' '==i.charAt(0);)i=i.substring(1);if(0==i.indexOf(e))return i.substring(e.length,i.length)}return''}

if (! getCookie("autobeanmin")) {
  min_acc = 90;
  document.cookie = 'autobeanmin=90; expires=' + new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
} else {
  min_acc = parseInt(getCookie("autobeanmin"));
}

if (! getCookie("autobeanmax")) {
  max_acc = 95;
  document.cookie = 'autobeanmax=95; expires=' + new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
} else {
  max_acc = parseInt(getCookie("autobeanmax"));
}

if (! getCookie("autobeanminq")) {
  min_q = 6;
  document.cookie = 'autobeanminq=6; expires=' + new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
} else {
  min_q = parseInt(getCookie("autobeanminq"));
}

if (! getCookie("autobeanmaxq")) {
  max_q = 16;
  document.cookie = 'autobeanmaxq=16; expires=' + new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
} else {
  max_q = parseInt(getCookie("autobeanmaxq"));

}

var c = document.createElement('div');
c.innerHTML = "<style>#ab-panel{all:initial;display:none;position:fixed;font-family:Arial,sans-serif!important;top:0;right:0;width:300px;height:100%;background-color:#0e1d36;color:#fff!important;padding:20px;box-shadow:-5px 0 15px rgba(0,0,0,.1);z-index:999}#ab-panel h2{color:#fff;}#ab-panel input{font-family:Arial,sans-serif!important;}#ab-panel button{border:0;border-radius:10px;background-color:#2f3f58;color:#fff;padding:5px 50px}#openPanel{position:fixed;top:10px;right:10px;z-index:999}.copen{border:0;border-radius:10px;background:linear-gradient(to right,#ff7955,#ff2424);color:#fff;padding:5px 50px}</style><div id=openPanel><button id=openPanelBtn class=copen>Autobean</button></div><div id=ab-panel><h2 style=font-family:Arial,sans-serif>Autobean</h2><br><label for=inputField>Min Accuracy:</label> <input id=i-tacc-min placeholder=0-100> <label for=inputField>Max Accuracy:</label> <input id=i-tacc-max placeholder=0-100><hr><label for=inputField>Min Question Time:</label> <input id=i-tacc-minq placeholder='Time in seconds'> <label for=inputField>Max Question Time:</label> <input id=i-tacc-maxq placeholder='Time in seconds'><hr><button id=cancelButton style=margin-top:15px>Cancel</button> <button id=startButton style=margin-top:15px>Start Bot</button></div>";
document.body.appendChild(c);


function openPanel() {
  document.getElementById("i-tacc-min").value = getCookie("autobeanmin")
  document.getElementById("i-tacc-max").value = getCookie("autobeanmax")
  document.getElementById("i-tacc-minq").value = getCookie("autobeanminq")
  document.getElementById("i-tacc-maxq").value = getCookie("autobeanmaxq")
  document.getElementById("ab-panel").style.display = "block";
}

// Function to close the panel
function closePanel() {
  document.getElementById("ab-panel").style.display = "none";
}



function ab () {
  document.getElementById("ab-panel").style.display = "none";
const interval = {
  test: '',
  click: '',
  deltest: '',
};
const bool = {
  bot: true,
  on: true,
  skip: true,
};
const object = {
  div: '',
  button1: '',
};


let disp_accu = Math.round((min_acc+(Math.random()*(max_acc-min_acc)))*10)/10;
let targ_accu = disp_accu/100;
alert(`This sessions accuracy target is ${disp_accu}%.`);
console.log(`Session Accuracy Target is ${disp_accu}%`);

function test() {
  if (bool.bot == true) {
    try {
      if (document.Pass) {
        bool.bot = false;
        set('click');
      } else if (document.getElementById('next-btn')) {
        setTimeout(() => { set('study'); }, 20000);
        console.log('New word - will wait for 20 seconds before continuing');
        setTimeout(() => { set('newWord'); }, 1500);
        set('stop');
      } else {
        setTimeout(() => { set('test'); }, 1000);
        console.log('Scanning for question');
        set('stop');
      }
    } catch { TypeError; }
  }
}

function set(type) {
  if (type == 'click') {
    try {
      if (Math.random() > targ_accu && bool.skip == true && alotted_time()) { // To skip or not the skip
        // Will skip if it rolls to do so, the user hasn't disabled skipping, and the question has a time limit
        const skipTime = alotted_time() * 1000;
        console.log('Skipping question');
        setTimeout(() => { set('skippedWord'); }, skipTime);
        set('stop');
      } else { 
        let notimeoutbuffer = Math.round((min_q+Math.random()*(max_q-min_q))*100)/100
        console.log('This question will be answered in', notimeoutbuffer, 'seconds');
        interval.click = setTimeout(press, notimeoutbuffer*1000);
      }
    } catch { TypeError; }
  } else if (type == 'test') { // starts testing after 2 seconds
    interval.deltest = setTimeout(() => { bool.bot = true; }, 2000);
  } else if (type == 'stop') { // Clear answering and testing timeouts
    clearTimeout(interval.click);
    clearTimeout(interval.deltest);
    bool.bot = false;
  } else if (type == 'newWord') { // Constantly checks to make sure that the user hasn't manually skipped the new word
    if (document.getElementById('next-btn')) {
      setTimeout(() => { set('newWord'); }, 1500);
    } else {
      set('test');
    }
  } else if (type == 'skippedWord') { // Constantly looks for the next button, clicks it when it's found
    if (document.getElementById('next-btn')) {
      set('study');
      set('test');
    } else {
      setTimeout(() => { set('skippedWord'); }, 1000);
    }
  } else if (type == 'study') { // Skips thru the study screen
    if (document.getElementById('next-btn')) {
      const x = document.querySelectorAll('#choice-section li');
      console.log('Next button clicked');
      x[0].click();
      x[1].click();
      x[2].click();
      document.getElementById('next-btn').click();
    }
  }
}

function newWordLogs(timeLeft) {
  if (document.getElementById('next-btn')) {
    console.log(timeLeft);
  }
}

function alotted_time() { // Gets the alotted time for the question
  try {
    const timerContainer = document.getElementById('timer-container');
    const timeoutValue = timerContainer.getAttribute('data-timeout');
    return parseInt(timeoutValue);
  } catch { TypeError; }
}

function press() { // Answers the question, avoids the button that detects cheating
  try {
    if (document.activeElement) {
      document.activeElement.blur();
    }
    if (document.getElementById('fail__event')) {
      if (document.getElementById('pass__event')) {
        document.getElementById('pass__event').click();
        console.log('Question Answered');
        set('test');
      } else {
        console.error('Error: Answer could not be identified\nPlease report this error on the Github issues page');
        document.getElementById('done-btn__event').click();
      }
    } else {
      document.Pass.click();
      console.log('Question answered');
      set('test');
    }
  } catch { TypeError; }
}

function start() {
  if (bool.on == true) {
    set('stop');
    bool.on = false;
    bool.bot = false;
    set('stop');
    console.log('Bot Inactive');
    document.getElementById('button1').innerHTML = 'Off';
  } else if (bool.on == false) {
    bool.on = true;
    bool.bot = true;
    console.log('Bot Active');
    document.getElementById('button1').innerHTML = 'On';
  }
}

function skip() {
  if (bool.skip == true) {
    bool.skip = false;
    console.log('Answering all questions (Will still wait for 1 minute on new words)');
    document.getElementById('button2').innerHTML = 'Skip: Off';
  } else if (bool.skip == false) {
    bool.skip = true;
    console.log('Skipping some questions');
    document.getElementById('button2').innerHTML = 'Skip: On';
  }
}

interval.test = setInterval(test, 1);

}

document.getElementById("openPanelBtn").addEventListener("click", openPanel);
document.getElementById("startButton").addEventListener("click", ab);
document.getElementById("cancelButton").addEventListener("click", closePanel);