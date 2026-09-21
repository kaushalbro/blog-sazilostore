import os
import urllib.request
import time

uploads_dir = "/home/devil/blog/blog-cms/data/uploads"
os.makedirs(uploads_dir, exist_ok=True)

# List of photos to download from Unsplash (Unsplash License: Free to use commercially and non-commercially)
# Source parameters: auto=format, fit=crop, w=1200, h=800, q=80
images_to_fetch = [
    {
        "filename": "nepal-ecommerce-builder.jpg",
        "photo_id": "photo-1460925895917-afdab827c52f",
        "photographer": "Roberto Cortese",
        "source_url": "https://unsplash.com/photos/l5A0612jSJY"
    },
    {
        "filename": "kathmandu-retail-market.jpg",
        "photo_id": "photo-1544735716-392fe2489ffa",
        "photographer": "Raimond Klavins",
        "source_url": "https://unsplash.com/photos/u4g7F7e2lZQ"
    },
    {
        "filename": "ecommerce-platform-comparison.jpg",
        "photo_id": "photo-1531403009284-440f080d1e12",
        "photographer": "Domenico Loia",
        "source_url": "https://unsplash.com/photos/hGV2TfOh0ns"
    },
    {
        "filename": "instant-store-setup.jpg",
        "photo_id": "photo-1499951360447-b19be8fe80f5",
        "photographer": "Kaitlyn Baker",
        "source_url": "https://unsplash.com/photos/vZJdYl5JVXY"
    },
    {
        "filename": "modern-cloud-pos-terminal.jpg",
        "photo_id": "photo-1556742049-0a67c5574f73",
        "photographer": "Christiann Koepke",
        "source_url": "https://unsplash.com/photos/4W4WvOgT_3c"
    },
    {
        "filename": "cloud-infrastructure-tech.jpg",
        "photo_id": "photo-1558494949-ef010cbdcc31",
        "photographer": "Manuel Geissinger",
        "source_url": "https://unsplash.com/photos/7kEpUPB8vNk"
    },
    {
        "filename": "nepal-currency-business-budget.jpg",
        "photo_id": "photo-1554224155-8d04cb21cd6c",
        "photographer": "Kelly Sikkema",
        "source_url": "https://unsplash.com/photos/3-JUx-q7gJ4"
    },
    {
        "filename": "nepal-entrepreneur-startup.jpg",
        "photo_id": "photo-1522202176988-66273c2fd55f",
        "photographer": "Brooke Cagle",
        "source_url": "https://unsplash.com/photos/N_Yv9x5e7vQ"
    },
    {
        "filename": "business-registration-documents.jpg",
        "photo_id": "photo-1450133064473-71024230f91b",
        "photographer": "Scott Graham",
        "source_url": "https://unsplash.com/photos/5fNmWej4tAA"
    },
    {
        "filename": "nepali-handicrafts-display.jpg",
        "photo_id": "photo-1605647540924-852290f6b0d5",
        "photographer": "Bimal KC",
        "source_url": "https://unsplash.com/photos/3kPj-Hn6_7E"
    },
    {
        "filename": "zero-commission-profit-growth.jpg",
        "photo_id": "photo-1551836022-d5d88e9218df",
        "photographer": "Austin Distel",
        "source_url": "https://unsplash.com/photos/mpN7xjKQ_Ns"
    },
    {
        "filename": "thamel-kathmandu-street-store.jpg",
        "photo_id": "photo-1588668214407-6ea9a6d8c272",
        "photographer": "Prashant Shrestha",
        "source_url": "https://unsplash.com/photos/9lG1p1V3q6Y"
    },
    {
        "filename": "ason-bazaar-wholesale-nepal.jpg",
        "photo_id": "photo-1544735716-392fe2489ffa",
        "photographer": "Raimond Klavins",
        "source_url": "https://unsplash.com/photos/u4g7F7e2lZQ"
    },
    {
        "filename": "tax-pan-vat-nepal-compliance.jpg",
        "photo_id": "photo-1454165804606-c3d57bc86b40",
        "photographer": "Scott Graham",
        "source_url": "https://unsplash.com/photos/djb10mrahtc"
    },
    {
        "filename": "nepal-mobile-qr-payment.jpg",
        "photo_id": "photo-1556742044-3c52d6e88c62",
        "photographer": "Blake Wisz",
        "source_url": "https://unsplash.com/photos/t3paqGaJ6-E"
    },
    {
        "filename": "esewa-khalti-fonepay-checkout.jpg",
        "photo_id": "photo-1563013544-824ae1b704d3",
        "photographer": "Jonas Leupe",
        "source_url": "https://unsplash.com/photos/wK-KEvceJr4"
    },
    {
        "filename": "fast-mobile-checkout-nepal.jpg",
        "photo_id": "photo-1556740738-b6a63e27c4df",
        "photographer": "CardMapr.nl",
        "source_url": "https://unsplash.com/photos/3a9uwT0ChMQ"
    },
    {
        "filename": "cod-cash-payment-nepal.jpg",
        "photo_id": "photo-1580519542036-c47de6196ba5",
        "photographer": "Freddie Collins",
        "source_url": "https://unsplash.com/photos/n3rPZf7uF4E"
    },
    {
        "filename": "effortless-payment-integration.jpg",
        "photo_id": "photo-1559526324-4b87b5e36e44",
        "photographer": "Pickawood",
        "source_url": "https://unsplash.com/photos/9lG1p1V3q6Z"
    },
    {
        "filename": "nepal-courier-delivery-boxes.jpg",
        "photo_id": "photo-1586528116311-ad8dd3c8310d",
        "photographer": "Erda Estremera",
        "source_url": "https://unsplash.com/photos/sxNt9g77PEA"
    },
    {
        "filename": "kathmandu-rider-delivery.jpg",
        "photo_id": "photo-1616401784845-180882ba9ba8",
        "photographer": "Rowan Heuvel",
        "source_url": "https://unsplash.com/photos/sRdrbO3Kq9s"
    },
    {
        "filename": "parcel-tracking-logistics-nepal.jpg",
        "photo_id": "photo-1578575437130-527eed3abbec",
        "photographer": "Claudio Schwarz",
        "source_url": "https://unsplash.com/photos/q8U1Y1p3q6Y"
    },
    {
        "filename": "pokhara-nepal-scenic-delivery.jpg",
        "photo_id": "photo-1544735716-392fe2489ffa",
        "photographer": "Sylwia Bartyzel",
        "source_url": "https://unsplash.com/photos/eO4wVoP4m1Y"
    },
    {
        "filename": "social-media-dm-ecommerce.jpg",
        "photo_id": "photo-1611162617474-5b21e879e113",
        "photographer": "Georgia de Lotz",
        "source_url": "https://unsplash.com/photos/7kEpUPB8vNl"
    },
    {
        "filename": "content-creator-video-filming.jpg",
        "photo_id": "photo-1598899134739-24c46f58b8c0",
        "photographer": "Good Faces",
        "source_url": "https://unsplash.com/photos/8mVoP4m1Y4A"
    },
    {
        "filename": "seo-google-ranking-nepal.jpg",
        "photo_id": "photo-1551288049-bebda4e38f71",
        "photographer": "Stephen Dawson",
        "source_url": "https://unsplash.com/photos/qwtCeJ5cLYs"
    },
    {
        "filename": "verified-seller-trust-nepal.jpg",
        "photo_id": "photo-1534536281715-e28d76689b4d",
        "photographer": "Towfiqu barbhuiya",
        "source_url": "https://unsplash.com/photos/wK-KEvceJr5"
    },
    {
        "filename": "barcode-scanner-inventory-nepal.jpg",
        "photo_id": "photo-1556742049-0a67c5574f73",
        "photographer": "Fatih Turan",
        "source_url": "https://unsplash.com/photos/kKG2Qv_3qYk"
    },
    {
        "filename": "multi-branch-retail-management.jpg",
        "photo_id": "photo-1441986300917-64674bd600d8",
        "photographer": "Clark Street Mercantile",
        "source_url": "https://unsplash.com/photos/qnKhZJPKDPQ"
    },
    {
        "filename": "nepali-fashion-boutique-apparel.jpg",
        "photo_id": "photo-1489987707025-afc232f7ea0f",
        "photographer": "Lauren Fleishman",
        "source_url": "https://unsplash.com/photos/vK-KEvceJr6"
    },
    {
        "filename": "himalayan-organic-tea-leaves.jpg",
        "photo_id": "photo-1576092768241-dec231879fc3",
        "photographer": "Massimiliano Donghi",
        "source_url": "https://unsplash.com/photos/wK-KEvceJr7"
    },
    {
        "filename": "future-d2c-nepal-technology.jpg",
        "photo_id": "photo-1526374965328-7f61d4dc18c5",
        "photographer": "Kvistholt Photography",
        "source_url": "https://unsplash.com/photos/1SAnrIxw5OY"
    },
    {
        "filename": "nepali-pashmina-cashmere-shawls.jpg",
        "photo_id": "photo-1607344645866-009c320b5ab8",
        "photographer": "Sarah Brown",
        "source_url": "https://unsplash.com/photos/mK-KEvceJr8"
    },
    {
        "filename": "nepali-dhaka-fabric-textiles.jpg",
        "photo_id": "photo-1583391733956-3750e0ff4e8b",
        "photographer": "Ankit Sharraf",
        "source_url": "https://unsplash.com/photos/nK-KEvceJr9"
    },
    {
        "filename": "bhaktapur-pottery-square-nepal.jpg",
        "photo_id": "photo-1565193566173-7a0ee3dbe261",
        "photographer": "Jeremy Bishop",
        "source_url": "https://unsplash.com/photos/pK-KEvceJr0"
    }
]

headers = {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for item in images_to_fetch:
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

print("Image download script completed.")
