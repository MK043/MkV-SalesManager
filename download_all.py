import os
import urllib.request
import re

base_url = 'https://avto-panel.demo.aivinity.ru'

def download_file(rel_path):
    url = base_url + rel_path
    local_name = os.path.basename(rel_path)
    local_path = os.path.join('scraped_source', local_name)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            with open(local_path, 'wb') as f:
                f.write(data)
            print(f'Downloaded {rel_path} ({len(data)} bytes)')
            return data
    except Exception as e:
        print(f'Failed to download {rel_path}: {e}')
        return None

# Known files from previous scan
assets = [
   '/assets/AuditScreen-BpeAp2w-.js',
   '/assets/Badge-BQCvYUpK.js',
   '/assets/BookingsScreen-DWVhsvLG.js',
   '/assets/CashScreen-IcYzrSYV.js',
   '/assets/Checkbox-CAK8Tl3G.js',
   '/assets/CompanyTasksScreen-DwCuTDtu.js',
   '/assets/CustomerDetailScreen-Cedz6HUu.js',
   '/assets/CustomersScreen-Dy79xxVM.js',
   '/assets/EmployeesScreen-Cauy0fy1.js',
   '/assets/Modal-CiV1cu2x.js',
   '/assets/MyTasksScreen-CW23f9se.js',
   '/assets/OrderDetailScreen-Bdi9fV2m.js',
   '/assets/OrdersListScreen-KwcTAs3g.js',
   '/assets/OverviewScreen-LvJ9DxrS.js',
   '/assets/PageStates-DtfKgSTY.js',
   '/assets/ParkingScreen-e3O5yEl9.js',
   '/assets/PartsScreen-Cw9DvOqY.js',
   '/assets/PipelineBoardScreen-Bz6FsnLx.js',
   '/assets/PipelineKpiStrip-CH1Jf0CI.js',
   '/assets/PlaceholderScreen-B9YLepxC.js',
   '/assets/ProfileScreen-BnHOk8Cv.js',
   '/assets/ReportsScreen-CgQCMBZH.js',
   '/assets/ServiceTodayScreen-C6Pe4tQY.css',
   '/assets/ServiceTodayScreen-CNdx2J4j.js',
   '/assets/SettingsScreen-MLSQuB-1.js',
   '/assets/ShiftQueueWidget-Bx-V98nn.js',
   '/assets/ShiftsQueueScreen-DLDUsJxe.js',
   '/assets/StaffProfileModal-BL8Z0nXR.js',
   '/assets/StubScreen-BXMChf7q.js',
   '/assets/Tabs-D0I3oi9J.js',
   '/assets/WarehouseScreen-CrkCQBAO.js',
   '/assets/cashTypes-TCdAEIs3.js',
   '/assets/employees-xbeA6osA.js',
   '/assets/parts-COoyznof.js',
   '/assets/permissionsSummary-Bm74CTx_.js',
   '/assets/plus-W58vTyGK.js',
   '/assets/query-CwiaLd8H.js',
   '/assets/react-window-CqZW8YU6.js',
   '/assets/router-Ldlm7Bhn.js',
   '/assets/ruFormat-CzZwtMUk.js',
   '/assets/samples-DnYLCvLT.js',
   '/assets/shortName-DTV-UkRo.js',
   '/assets/trash-2-BpuMqUtQ.js',
   '/assets/useStagePositions-TriBkxGo.js',
   '/assets/warehouse-WN6iyBs4.css',
   '/author.jpg',
   '/favicon.svg'
]

for a in assets:
    download_file(a)
    # Check sourcemap
    if a.endswith('.js') or a.endswith('.css'):
        map_path = a + '.map'
        download_file(map_path)
