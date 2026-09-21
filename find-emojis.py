import os
import re

emoji_pattern = re.compile(r'[\U00010000-\U0010ffff]|[\u2600-\u27ff]|[\u2300-\u23ff]|[\u2b50-\u2b55]|[\u200d\ufe0f]')

directories = ['/home/devil/blog/regular-resonance/src', '/home/devil/blog/blog-cms/data', '/home/devil/blog/blog-cms/scripts']

for d in directories:
    for root, _, files in os.walk(d):
        for f in files:
            if f.endswith(('.astro', '.ts', '.tsx', '.json', '.css', '.js', '.py')):
                filepath = os.path.join(root, f)
                with open(filepath, 'r', encoding='utf-8', errors='ignore') as file:
                    content = file.read()
                    matches = emoji_pattern.findall(content)
                    if matches:
                        print(f"{filepath}: found {len(matches)} emojis -> {set(matches)}")
