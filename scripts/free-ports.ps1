# Script to free ports 3000 and 3001
# Used before starting dev:full to prevent port conflicts

$ports = @(3000, 3001)
$stoppedCount = 0

Write-Host "Checking ports 3000 and 3001..." -ForegroundColor Cyan

foreach ($port in $ports) {
    try {
        $connections = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
        
        if ($connections) {
            $processes = $connections | Select-Object -ExpandProperty OwningProcess -Unique
            
            foreach ($pid in $processes) {
                try {
                    $process = Get-Process -Id $pid -ErrorAction SilentlyContinue
                    if ($process) {
                        Write-Host "  Stopping process $pid (port $port): $($process.ProcessName)" -ForegroundColor Yellow
                        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
                        $stoppedCount++
                    }
                } catch {
                    # Process already terminated, ignore
                }
            }
        } else {
            Write-Host "  Port $port is free" -ForegroundColor Green
        }
    } catch {
        Write-Host "  Port $port is free" -ForegroundColor Green
    }
}

if ($stoppedCount -gt 0) {
    Write-Host ""
    Write-Host "Freed ports: $stoppedCount" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "All ports are free" -ForegroundColor Green
}

Write-Host ""
