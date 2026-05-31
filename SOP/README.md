<h1>Introduction</h1>
The Same Origin Policy (SOP) is the main browser security model that isolates web applications. This isolation means that a website or rather the scripts of a website cannot access the data of a different one unless given explicit permission. Now... by websites what I really meant was origins and that's because SOP works by isolating combinations of protocols, hosts and ports (protocol + host + port = origin). So SOP restricts the access that one origin's scripts have on another origin's data.
<h2>How the Bug is Born</h2>
Same Origin Policy bugs emerge by bypassing SOP restrictions. Bypasses can occur via XSS, CSRF or CORS misconfigurations.
