import re
import urllib.request
import os

base_url = 'https://avto-panel.demo.aivinity.ru'

# Check sourcemaps
for fname in os.listdir('scraped_source'):
    if fname.endswith('.js') or fname.endswith('.css'):
        if 'theme-boot' in fname:
            map_url = f'{base_url}/{fname}.map'
        else:
            map_url = f'{base_url}/assets/{fname}.map'
        try:
            req = urllib.request.Request(map_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as resp:
                data = resp.read()
                map_fname = os.path.join('scraped_source', f'{fname}.map')
                with open(map_fname, 'wb') as f:
                    f.write(data)
                print(f'Found sourcemap: {fname}.map ({len(data)} bytes)')
        except Exception as e:
            pass

# Check all references to /assets/ or .js or .svg or .png in downloaded files
chunks = set()
for fname in os.listdir('scraped_source'):
    path = os.path.join('scraped_source', fname)
    if os.path.isfile(path) and not path.endswith('.map'):
        try:
            text = open(path, 'r', encoding='utf-8', errors='ignore').read()
            found = re.findall(r'["\'`](/[a-zA-Z0-9_\-./]+\.(?:js|css|svg|png|jpg|webp|woff2?|json))["\'`]', text)
            for item in found:
                chunks.add(item)
            found2 = re.findall(r'["\'`](assets/[a-zA-Z0-9_\-./]+\.(?:js|css|svg|png|jpg|webp|woff2?|json))["\'`]', text)
            for item in found2:
                chunks.add('/' + item)
        except Exception as e:
            pass

print('Found assets/files in code:', len(chunks))
for c in sorted(chunks):
    print('  ', c)
