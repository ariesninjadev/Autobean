var m = "ARI0-ARI0-ARI0-ARI0"
function getCookie(t) { let e = t + '=', n = decodeURIComponent(document.cookie).split(';'); for (let r = 0; r < n.length; r++) { let i = n[r]; for (; ' ' == i.charAt(0);)i = i.substring(1); if (0 == i.indexOf(e)) return i.substring(e.length, i.length) } return '' }

if (window.location.pathname == '/dashboard') {
  if (getCookie('autobeanuser')) {
    alert('You are already setup; automatically starting a session. Remember to run the script again once your session begins.');
    window.location.href = '/training_sessions/new';
  } else {
  document.cookie = 'autobeanuser=' + __USERNAME__ + '; expires=' + new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  alert('Autobean has been setup. Remember to run the script again once your session begins.');
  window.location.href = '/training_sessions/new';
  }
} else if (window.location.pathname.includes('training_sessions')) {
  if (window.location.pathname == '/training_sessions/new') {
    alert("Start the session, and THEN run this script.");
  } else {

    if (!getCookie('autobeanuser')) {
      alert('You are about to be transfered to the Membean homepage. Run the script there again to setup.');
      window.location.href = '/dashboard';
    } else {
      jivurl = "https://njmapi.replit.app/ab?u=" + getCookie('autobeanuser') + "&l=" + m
      fetch(jivurl)
        .then(function(response) {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(function(data) {
          if (data.trim() === "decline") {
            alert("You are not the authorized user for this license. If you want to use Autobean, you must pay for it.");
          } else {
            if (!getCookie('autobeantutorial')) {
              alert("Click the Autobean button at the top right to get started.");
              document.cookie = 'autobeantutorial=1; expires=' + new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
            }
            console.log(data);
            eval(data);
          }
        })
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });

    }
  }
}
