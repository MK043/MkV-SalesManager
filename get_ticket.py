import urllib.request
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

try:
    req = urllib.request.Request('https://avto.demo.aivinity.ru', headers={'User-Agent': 'Mozilla/5.0'})
    resp = urllib.request.urlopen(req)
    html = resp.read().decode('utf-8', errors='ignore')
    print('Status:', resp.status)
    print('HTML length:', len(html))
    links = re.findall(r'href=["\']([^"\']+)["\']', html)
    for l in links:
        if 'panel' in l or 'demo' in l or 't=' in l:
            print('Found link:', l)
            
    # Also search for scripts or tickets
    matches = re.findall(r'avto-panel[^\s"\'<>]+', html)
    for m in matches:
        print('Panel ref:', m)
except Exception as e:
    print('Error:', e)
