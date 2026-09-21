import os
import urllib.request

uploads_dir = "/home/devil/blog/blog-cms/data/uploads"
headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}

missing_images = [
    {
        "filename": "modern-cloud-pos-terminal.jpg",
        "photo_id": "photo-1556740758-90de374c12ad",
        "photographer": "Blake Wisz",
        "source_url": "https://unsplash.com/photos/t3paqGaJ6-E"
    },
    {
        "filename": "barcode-scanner-inventory-nepal.jpg",
        "photo_id": "photo-1556742111-a301076d9d18",
        "photographer": "Christiann Koepke",
        "source_url": "https://unsplash.com/photos/4W4WvOgT_3c"
    },
    {
        "filename": "nepali-pashmina-cashmere-shawls.jpg",
        "photo_id": "photo-1520006403909-838d6b92c22e",
        "photographer": "Sarah Brown",
        "source_url": "https://unsplash.com/photos/mK-KEvceJr8"
    }
]

for item in missing_images:
    dest_path = os.path.join(uploads_dir, item["filename"])
    url = f"https://images.unsplash.com/{item['photo_id']}?auto=format&fit=crop&w=1200&h=800&q=80"
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            with open(dest_path, "wb") as f:
                f.write(data)
        print(f"Downloaded {item['filename']} ({len(data)} bytes) - Credit: {item['photographer']}")
    except Exception as e:
        print(f"Error downloading {item['filename']}: {e}")

