<h1>DOM-based XSS</h1>
<h2>Theory</h2>
Document Object Model XSS or DOM based XSS is a cross-site scripting vulnerability variant/subcategory that exists solely on the frontend (client side) code. If XSS exists but is not triggered after a network request and response cycle, then it most likely is a DOM-based bug.
<h2>Lab instructions</h2>
Submit the following payload <code>&lt;img onerror&equals;alert&lpar;1&rpar; src&equals;d&gt;</code>. Due to the use of an unsafe sink (output<strong>.innerHTML</strong>) and the complete absence of input validation, the browser will interpret our payload as code. Therefore, src=<em>d</em> (invalid source) leads to the event-handler <strong>onerror</strong> that when fired executes an inline script: <code>alert(1)</code>.
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
</ul>
