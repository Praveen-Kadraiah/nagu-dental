import urllib.request
import urllib.error
import sys

sys.stdout.reconfigure(encoding='utf-8')

urls = [
    "http://localhost:8000/index.html",
    "http://localhost:8000/assets/css/Janani.css",
    "http://localhost:8000/assets/img/Janani-logo-dark.svg",
    "http://localhost:8000/assets/img/Janani-logo.svg",
    "http://localhost:8000/assets/img/cta%20doctor.png",
    "http://localhost:8000/assets/img/our%20service%20doctor.png"
]

print("Verifying server responses for key assets:")
all_ok = True
for url in urls:
    try:
        response = urllib.request.urlopen(url)
        code = response.getcode()
        print(f"  {url} -> {code} OK")
    except urllib.error.HTTPError as e:
        print(f"  {url} -> ERROR: {e.code} {e.reason}")
        all_ok = False
    except Exception as e:
        print(f"  {url} -> ERROR: {e}")
        all_ok = False

if all_ok:
    print("All key assets loaded successfully with 200 OK!")
else:
    print("Some assets failed to load.")
