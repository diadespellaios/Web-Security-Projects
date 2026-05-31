<h1>Reflected XSS</h1>
<h2>Theory</h2>
Reflected XSS is a cross-site scripting vulnerability variant/subcategory that is triggered after a network request and response cycle. Our XSS payload will appear within the HTTP response.
<h2>Lab instructions</h2>
Submit the following payload <code>&lt;img onerror&equals;alert&lpar;document.cookie&rpar; src&equals;d&gt;</code>. Due to the use of an unsafe sink (output<strong>.innerHTML</strong>) and the complete absence of input validation (server side), the browser will interpret our payload as code. Therefore, src=<em>d</em> (invalid source) leads to the event-handler <strong>onerror</strong> that when fired executes an inline script: <code>alert(document.cookie)</code>.
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
