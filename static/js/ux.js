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
    if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
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


// -----------------------------------------------------------------------------
// The following functions has been replaced by modals.
// 
// function downloadFeedback() {
//     alert("The file is being downloaded to your default folder.");
// }
// 
// function archiveFeedback() {
//     alert("The file is being uploaded to the online mongo database.");
// }
// -----------------------------------------------------------------------------