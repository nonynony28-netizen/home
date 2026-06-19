# serve.ps1
$port = 8000
$listener = New-Object System.Net.HttpListener

# Get local IP address for display
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.IPAddress -notlike "127.*" -and 
    $_.InterfaceAlias -notlike "*Loopback*" -and 
    $_.IPAddress -notlike "169.254.*"
} | Select-Object -First 1).IPAddress

$bindAll = $false
try {
    # Attempt to bind to all interfaces (allows phone access, requires Admin privileges)
    $listener.Prefixes.Add("http://+:$port/")
    $listener.Start()
    $bindAll = $true
} catch {
    # Fallback to localhost if not run as Administrator
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

try {
    Write-Host "=========================================" -ForegroundColor Yellow
    Write-Host "   Bait Al-Shawaa Luxury Menu Local Web Server" -ForegroundColor Cyan
    if ($bindAll) {
        Write-Host "   Server is accessible on your local network!" -ForegroundColor Green
        Write-Host "   Local URL: http://localhost:$port/" -ForegroundColor Green
        if ($ip) {
            Write-Host "   Phone URL: http://$($ip):$port/" -ForegroundColor Green
        }
    } else {
        Write-Host "   Server is running in LOCAL ONLY mode." -ForegroundColor Yellow
        Write-Host "   Local URL: http://localhost:$port/" -ForegroundColor Green
        Write-Host "   -> TO OPEN ON PHONE: Run PowerShell as ADMINISTRATOR and restart server." -ForegroundColor Red
    }
    Write-Host "   Press Ctrl+C to shutdown the server" -ForegroundColor Yellow
    Write-Host "=========================================" -ForegroundColor Yellow

    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $path = $request.Url.LocalPath
            if ($path -eq "/") {
                $path = "/index.html"
            }

            # Safe directory joining
            $currentDir = Get-Location
            $filePath = Join-Path $currentDir $path.Replace("/", "\").TrimStart("\")

            if (Test-Path $filePath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                
                # Content Type Mapping
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = switch ($ext) {
                    ".html" { "text/html; charset=utf-8" }
                    ".css"  { "text/css; charset=utf-8" }
                    ".js"   { "application/javascript; charset=utf-8" }
                    ".json" { "application/json; charset=utf-8" }
                    ".png"  { "image/png" }
                    ".jpg"  { "image/jpeg" }
                    ".jpeg" { "image/jpeg" }
                    ".gif"  { "image/gif" }
                    ".svg"  { "image/svg+xml; charset=utf-8" }
                    ".ico"  { "image/x-icon" }
                    default { "application/octet-stream" }
                }
                
                $response.ContentType = $contentType
                $response.ContentLength64 = $bytes.Length
                $response.Headers.Add("Access-Control-Allow-Origin", "*")
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: The file $path does not exist.")
                $response.ContentType = "text/plain; charset=utf-8"
                $response.ContentLength64 = $errBytes.Length
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
            $response.OutputStream.Close()
        } catch {
            Write-Host "Connection error (handled): $_" -ForegroundColor DarkGray
            if ($null -ne $response) {
                try { $response.Close() } catch {}
            }
        }
    }
} catch {
    Write-Host "Error starting/running server: $_" -ForegroundColor Red
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    Write-Host "Server Stopped." -ForegroundColor Red
}
