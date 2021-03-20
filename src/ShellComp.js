import React, { useRef } from 'react';

export default function ShellComp() {
    //const [localStorage, setLocalStorage] = useState({});
    const urlSearch = useRef();

    function searchHandler(evt) {
        const searchTerm = urlSearch.current.value;
        if (searchTerm === '') return;
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

    return (
        <>
        <div>
            <input ref={urlSearch} type="text" />
            <button onClick={searchHandler}>Check URL</button>
            <button onClick={resultsHandler}>View Results</button>
            <button onClick={clearHandler}>Clear Results</button>
        </div>
        <div id='res-div'>
        </div>
        </>
    )
}