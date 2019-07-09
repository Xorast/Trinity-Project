// JAVASCRIPT
// UX
// Scripts to enhance User Experience


// Show & Hide buttons
window.onscroll = function() {scrollFunction_commandBoard(); scrollFunction_infoBoard()};

function scrollFunction_commandBoard() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("commandBoard").style.display = "block";
    } else {
        document.getElementById("commandBoard").style.display = "none";
    }
    if (window.innerHeight + window.scrollY > document.body.clientHeight - 100) {
            document.getElementById('commandBoard').style.display='none';
    }
}

// Show & Hide infos
function scrollFunction_infoBoard() {
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        document.getElementById("infoBoard").style.display = "block";
    } else {
        document.getElementById("infoBoard").style.display = "none";
    }
    if (window.innerHeight + window.scrollY > document.body.clientHeight - 100) {
            document.getElementById('commandBoard').style.display='none';
    }
}

// Resize charts buttons (charts svg are regenerated)
function resizeCharts() {
    location.reload();
}

// Go back button
function goBack() {
        window.history.back();
}
    
// Active navbar 
$(document).ready(function () {
    var url = window.location;
    $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
    $('ul.nav a').filter(function() {
         return this.href == url;
    }).parent().addClass('active');
});
