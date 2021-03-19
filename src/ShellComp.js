import React, { useRef, useState } from 'react';

export default function ShellComp() {
    
    const [scans, setScans] = useState(null);
    const urlSearch = useRef();
    function searchHandler(evt) {
        const searchTerm = urlSearch.current.value;
        if (searchTerm === '') return;
        virusTotalScanSearch(searchTerm);
        urlSearch.current.value = null;
    }

    function clearHandler() {
        window.location.reload(true);
    }

    function virusTotalScanSearch(input) {
        let tempArr = [];
        const apiKey = '142513a6f4669a85806410b9d39f46aeb6fac11620dac13c1131fd64320543b1';
       const searchUrl = 'https://cors-anywhere.herokuapp.com/https://www.virustotal.com/vtapi/v2/url/report?apikey=' + apiKey + '&resource=' + input;
       const searchHttp = new XMLHttpRequest();
        searchHttp.open("GET", searchUrl);
        searchHttp.setRequestHeader('Origin', 'https://www.virustotal.com');
        searchHttp.send();
        searchHttp.onreadystatechange=function(){
                     if(this.readyState===4 && this.status===200){
                         const response = JSON.parse(searchHttp.responseText);
                         setScans(response.scans);
                     }
    }
    return tempArr;
}

    return (
        <>
        <div>
            <input ref={urlSearch} type="text" />
            <button onClick={searchHandler}>Check URL</button>
            <button onClick={clearHandler}>Clear Results</button>
        </div>
        <div>
            <ul>
                {this.state.scans.map(s => (<li>{s}</li>))}
            </ul>
        </div>
        </>
    )
}