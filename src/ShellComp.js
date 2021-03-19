import React, { useRef, useState } from 'react';
import ResultsShellComp from './ResultsShellComp';

export default function ShellComp() {
    const [results] = useState([])
    const urlSearch = useRef();
    function searchHandler(evt) {
        const searchTerm = urlSearch.current.value;
        if (searchTerm === '') return;
        console.log(searchTerm);
        virusTotalScanSearch(searchTerm);
        urlSearch.current.value = null;
    }

    function clearHandler() {
        window.location.reload(true);
    }
 //   searchBtn.addEventListener("click", omdbSearch);

// function omdbSearch() {
//     const keyUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=5149020a&t=";
//     const Http = new XMLHttpRequest();
//     var movieTitle = document.getElementById("movieTitle").value;
//     var fullRequest = keyUrl.concat(movieTitle);
//     Http.open("GET", fullRequest);
//     Http.send();
//     Http.onreadystatechange=function(){
//         if(this.readyState==4 && this.status==200){
//             console.log(Http.responseText)
//         }
//     }

    function virusTotalScanSearch(input) {
        const apiKey = '142513a6f4669a85806410b9d39f46aeb6fac11620dac13c1131fd64320543b1';
       const searchUrl = 'https://www.virustotal.com/vtapi/v2/url/report';
       // const scanUrl = 'https://www.virustotal.com/vtapi/v2/url/scan';
       const searchHttp = new XMLHttpRequest();
       // const scanHttp = new XMLHttpRequest();
        let searchParams = {'apikey': apiKey, 'url': input}
        searchHttp.open("GET", searchUrl);
        searchHttp.send(searchParams);
        searchHttp.onreadystatechange=function(){
                     if(this.readyState===4 && this.status===200){
                         console.log(searchHttp.responseText)
                     }
    }
}



    return (
        <>
        <div>
            <input ref={urlSearch} type="text" />
            <button onClick={searchHandler}>Check URL</button>
            <button onClick={clearHandler}>Clear Results</button>
        </div>
        <div>
            <ResultsShellComp results={results}/>
        </div>
        </>
    )
}