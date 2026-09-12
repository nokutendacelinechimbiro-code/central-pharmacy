@echo off
cd /d "%~dp0"
title Central Pharmacy website
echo Starting Central Pharmacy...
echo.
echo Open this in your browser:
echo   http://127.0.0.1:5500/
echo.
echo Keep this window open while you use the site.
echo Close it when you are done.
echo.
powershell -NoProfile -ExecutionPolicy Bypass -Command "$root = (Get-Location).Path; $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://127.0.0.1:5500/'); try { $listener.Prefixes.Add('http://localhost:5500/') } catch {}; $listener.Start(); Write-Host 'Ready: http://127.0.0.1:5500/'; while ($listener.IsListening) { $ctx = $listener.GetContext(); $path = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath); if ($path -eq '/') { $path = '/index.html' }; $file = Join-Path $root ($path.TrimStart('/').Replace('/','\')); if (Test-Path $file -PathType Leaf) { $bytes = [IO.File]::ReadAllBytes($file); $ext = [IO.Path]::GetExtension($file).ToLower(); $type = 'application/octet-stream'; if ($ext -eq '.html') { $type = 'text/html' }; if ($ext -eq '.css') { $type = 'text/css' }; if ($ext -eq '.js') { $type = 'application/javascript' }; if ($ext -eq '.svg') { $type = 'image/svg+xml' }; $ctx.Response.ContentType = $type; $ctx.Response.StatusCode = 200; $ctx.Response.OutputStream.Write($bytes,0,$bytes.Length) } else { $ctx.Response.StatusCode = 404; $msg = [Text.Encoding]::UTF8.GetBytes('Not found'); $ctx.Response.OutputStream.Write($msg,0,$msg.Length) }; $ctx.Response.Close() }"
pause
