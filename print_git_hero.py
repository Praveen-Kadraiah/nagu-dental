import subprocess

try:
    content = subprocess.check_output('git show HEAD:variant-blue/index.html', shell=True).decode('utf-8')
    header_start = content.find('<header class="section_hero')
    header_end = content.find('</header>') + 9
    
    if header_start != -1 and header_end != -1:
        print(content[header_start:header_end])
    else:
        print("Could not find header in file")
except Exception as e:
    print(f"Error: {e}")
