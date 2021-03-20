import React, { useRef } from 'react';
import './ShellComp.css';

export default function ShellComp() {
    //const [localStorage, setLocalStorage] = useState({});
    const urlSearch = useRef();

    function searchHandler(evt) {
        const searchTerm = urlSearch.current.value;
        if (searchTerm === '') return;
        tempAlert("Scanning...", 3000);
        virusTotalScanSearch(searchTerm);
        urlSearch.current.value = null;
    }

    function resultsHandler() {
        var temp = JSON.parse(localStorage.getItem('response'));
        if (temp) {
        temp = temp.substring(temp.indexOf("scans") + 7);
        temp = temp.replace(/{/g, '');
        var tempArr = temp.split('},');
        tempArr.forEach(element => {
            document.getElementById('res-div').innerHTML += '<p>' + element + '</p>';
        });
        }
        var temp2 = JSON.parse(localStorage.getItem('responseBackup'));
        if (temp2) {
        temp2 = temp2.substring(temp2.indexOf("scans") + 7);
        temp2 = temp2.replace(/{/g, '');
        var tempArr2 = temp2.split('},');
        tempArr2.forEach(element => {
            document.getElementById('res-div').innerHTML += '<p>' + element + '</p>';
        });
    }
    }

    function clearHandler() {
        localStorage.clear();
        window.location.reload(true);
    }

    function tempAlert(msg,duration)
        {
        var el = document.createElement("div");
        el.setAttribute("style","position:absolute;top:50%;background-color:white;width:99%;height:60px;font-size:3rem;font-family:'Arial';text-align:center;border-radius:1rem;");
         el.innerHTML = msg;
        setTimeout(function(){
         el.parentNode.removeChild(el);
        },duration);
        document.body.appendChild(el);
        }

    function virusTotalScanSearch(input) {
        const apiKey = '142513a6f4669a85806410b9d39f46aeb6fac11620dac13c1131fd64320543b1';
       const searchUrl = 'https://www.virustotal.com/vtapi/v2/url/report?apikey=' + apiKey + '&resource=' + input;
       const backupSearchUrl = 'https://cors-anywhere.herokuapp.com' + searchUrl;
       const searchHttp = new XMLHttpRequest();
       const backupSearchHttp = new XMLHttpRequest();
        searchHttp.open("GET", searchUrl);
        backupSearchHttp.open("GET", backupSearchUrl);
        searchHttp.setRequestHeader('Origin', 'https://www.virustotal.com');
        backupSearchHttp.setRequestHeader('Origin', 'https://www.virustotal.com');
        searchHttp.send();
        searchHttp.onreadystatechange=function(){
                     if(this.readyState===4 && this.status===200){
                         const response = JSON.stringify(searchHttp.response);
                         localStorage.setItem('response', response);                         
                     }
    }
    backupSearchHttp.send();
        backupSearchHttp.onreadystatechange=function(){
                     if(this.readyState===4 && this.status===200){
                         const backupResponse = JSON.parse(searchHttp.responseText);
                         localStorage.setItem('backupResponse', backupResponse);
                     }
    }
}

const wrapperStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}
const buttonStyle = {
    color: "white",
    backgroundColor: "#000033",
    width: "20rem",
    height: "30px",
    borderRadius: "1rem",
    outline: "none",
    fontFamily: "Arial",
    fontSize: "1rem"
};

const textBoxStyle = {
    width: "19.5rem",
    height: "30px",
    borderRadius: "1rem",
    outline: "none",
    textAlign: "center",
    fontSize: "1rem",
    fontFamily: "Arial",
    placeholder: "...."
}

const titleStyle = {
    marginTop: ".5rem",
    marginBottom: ".5rem",
    padding: ".5rem",
    textAlign: "center",
    fontFamily: "Arial",
    color: "white",
    fontSize: "3rem",
}

const subtitle = {
    textAlign: "center",
    fontFamily: "Arial",
    color: "white",
    fontSize: "1.5rem",
    fontStyle: "italic",
    marginBottom: ".5rem"
}

const titleFill = {
    backgroundColor: "#000033",
    borderRadius: "1rem",
    paddingBottom: ".5rem",
    marginBottom: "1rem"
}

const resultStyle = {
    textAlign: "center",
    fontFamily: "Arial",
    color: "white",
    fontSize: "1.5rem",
}
    return (
        
        <>
        <div style={titleFill}>
        <div style={titleStyle}>URL Safe-Swim</div>
        <div style={subtitle}>always test the waters before diving in...</div>
        </div>
        <div className="wrapper" style={wrapperStyle}>
            <div className="inputs">
            <form action="https://docs.google.com/document/d/1B5VK90bYHVKqa14QIO_TQyQIiCrPPKB8GOjSofPne_Y/edit?usp=sharing">
                <input style={buttonStyle} type="submit" value="Creator's Resume" />
            </form>
            <p><input style={textBoxStyle} ref={urlSearch} type="text" /></p>
            <p><button style={buttonStyle} onClick={searchHandler}>Scan URL</button></p>
            <p><button style={buttonStyle} onClick={resultsHandler}>View Results</button></p>
            <p><button style={buttonStyle} onClick={clearHandler}>Clear Results</button></p>
            </div>
        </div>
        <div id='res-div' style={resultStyle}>
        </div>
        </>
    )
}