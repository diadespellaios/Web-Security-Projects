<h1>Stored XSS</h1>
<h2>Theory</h2>
Stored XSS is a cross-site scripting vulnerability variant/subcategory that exists (mainly) on the backend (server-side) code. If XSS exists and persists after a page refresh or on a new session, then it most likely is a stored XSS bug. This is the most critical type of XSS by far given that it can affect a large amount of users with minimal effort while also acting as a "fire and forget" attack.
<h2>Lab instructions</h2>
Submit the following payload <code>&lt;img onerror&equals;alert&lpar;document.cookie&rpar; src&equals;d&gt;</code>. Due to the use of an unsafe sink (output<strong>.innerHTML</strong>) and the complete absence of input validation and sanitization on the backend (when receiving, storing and retrieving user input) the browser will interpret our payload as code. Therefore, src=<em>d</em> (invalid source) leads to the event-handler <strong>onerror</strong> that when fired executes an inline script: <code>alert(document.cookie)</code>.
<h2>Prevention and Mitigation</h2>
<ul>
  <li>
    <h3>Use safe sinks whenever possible: <code>output.textContent = input.value</code></h3>
  </li>
  <li>
    <h3>Implement a Content Security Policy via server-side code (express middleware)</h3>
    <code>server.use((req, res, next) => {
      res.set(
        "Content-Security-Policy",
        [
          "default-src 'self'",
          "script-src 'self'",
          "style-src 'self' https://fonts.googleapis.com",
          "font-src https://fonts.gstatic.com"
        ].join("; ")
      )
      next()
})</code>
  </li>
  <li>Add HttpOnly Security flag on session and authentication cookies</li>
</ul>
