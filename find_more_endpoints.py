import os
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

for fname in ['EmployeesScreen-Cauy0fy1.js', 'SettingsScreen-MLSQuB-1.js', 'ShiftsQueueScreen-DLDUsJxe.js', 'CompanyTasksScreen-DwCuTDtu.js', 'ReportsScreen-CgQCMBZH.js', 'ProfileScreen-BnHOk8Cv.js']:
    path = os.path.join('scraped_source', fname)
    if os.path.exists(path):
        text = open(path, 'r', encoding='utf-8', errors='ignore').read()
        matches = re.findall(r'[\'\"`](/(?:[a-zA-Z0-9_\-]+(?:/[a-zA-Z0-9_\-\$#{}\?=&]+)*))[\'\"`]', text)
        print(f"=== {fname} ===")
        for m in sorted(set(matches)):
            if not m.endswith('.js') and not m.endswith('.css'):
                print("  ", m)
