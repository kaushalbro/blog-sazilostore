import json
import os

from articles_cat1 import cat1_articles
from articles_cat2 import cat2_articles
from articles_cat3 import cat3_articles
from articles_cat4 import cat4_articles
from articles_cat5 import cat5_articles
from articles_cat6 import cat6_articles
from articles_cat7 import cat7_articles
from articles_batch2_auto import batch2_auto_articles
from articles_batch2_shops import batch2_shops_articles

categories = [
    {
        "name": "Ecommerce & Tech",
        "slug": "ecommerce-tech",
        "description": "Technology innovations, storefront architecture, Cloud POS, and modern online commerce in Nepal."
    },
    {
        "name": "Business & Growth",
        "slug": "business-growth",
        "description": "Proven strategies, marketing insights, legal registration, and actionable tactics to scale local Nepali retail."
    },
    {
        "name": "Fintech & Payments",
        "slug": "fintech-payments",
        "description": "Seamless digital payments in Nepal: eSewa, Khalti, Fonepay QR, and automated checkout."
    },
    {
        "name": "Logistics & COD",
        "slug": "logistics-cod",
        "description": "Solving courier fulfillment, cash-on-delivery tracking, and nationwide parcel delivery across Nepal."
    },
    {
        "name": "Social Commerce & Marketing",
        "slug": "social-commerce",
        "description": "Transitioning from Instagram DMs and TikTok videos to automated, high-converting Sazilo Store checkout."
    },
    {
        "name": "Retail POS & Inventory",
        "slug": "retail-pos",
        "description": "Cloud POS, barcode scanning (<15ms), F2/F9 counter shortcuts, and omnichannel inventory management."
    },
    {
        "name": "Local Retail & D2C",
        "slug": "local-retail-d2c",
        "description": "Empowering Nepali fashion boutiques, organic tea/coffee producers, electronics sellers, and handicraft artisans."
    }
]

authors = [
    {
        "name": "Sazilo Store",
        "email": "contact@sazilostore.com",
        "avatar": "sazilo-logo.webp"
    }
]

global_info = {
    "siteName": "Sazilo Store",
    "siteDescription": "Global Marketplace & Direct Store Connect. Discover authentic products from verified local businesses with Zero Middleman.",
    "defaultSeo": {
        "metaTitle": "Sazilo Store Blog — Best E-Commerce Website Builder & Marketplace in Nepal",
        "metaDescription": "Discover authentic products from verified local businesses with Zero Middleman. Read the latest stories, marketplace innovations, and technology insights on Sazilo Store (Sajilo Store) Blog."
    }
}

about_info = {
    "title": "About Sazilo Store",
    "blocks": [
        {
            "__component": "shared.quote",
            "title": "Sazilo Store Mission",
            "body": "Build Your Online Ecommerce ShopSite Within Minutes. 0% Commission on Sales. Complete Cloud POS & Direct Store Connect in Nepal."
        },
        {
            "__component": "shared.rich-text",
            "body": """## Welcome to Sazilo Store (Sajilo Store)

Sazilo Store is Nepal's premier direct commerce platform, e-commerce website builder, and Cloud POS operating system. We empower local retailers, fashion boutiques, electronics stores, and creators to sell online with zero commission.

### Our Core Commerce Stack:
- **High-Velocity Cloud POS**: Run counter sales with barcode scanning (<15ms), F2 search, F9 instant checkout, and thermal receipts.
- **Barcode Studio & Sticker Engine**: Generate and print standardized Code128 barcodes directly to A4 sheets and thermal rolls.
- **Variant & Attribute Matrix**: Granular multi-tier attributes with purchase cost privacy and cut pricing.
- **Smart Combo Deal Engine**: Boost average cart sizes with bundled savings.
- **Branded Web Storefront**: Free `yourstore.sazilostore.com` subdomain, customized brand colors, and zero middleman markups."""
        }
    ]
}

all_raw_articles = (
    cat1_articles + cat2_articles + cat3_articles + cat4_articles +
    cat5_articles + cat6_articles + cat7_articles +
    batch2_auto_articles + batch2_shops_articles
)

formatted_articles = []
for art in all_raw_articles:
    photographer = art.get("photographer", "Sazilo Store Team")
    source_url = art.get("source_url", "https://unsplash.com")
    credit_line = f"\n\n---\n*Cover Image Credit: Photo by [{photographer}]({source_url}) on [Unsplash](https://unsplash.com?utm_source=sazilostore&utm_medium=referral) (Royalty-free under the Unsplash License)*"
    
    formatted_articles.append({
        "title": art["title"],
        "slug": art["slug"],
        "description": art["description"],
        "category": art["category"],
        "author": "Sazilo Store",
        "cover": art["cover"],
        "photographer": photographer,
        "source_url": source_url,
        "blocks": [
            {
                "__component": "shared.rich-text",
                "body": art["body"].strip() + credit_line
            },
            {
                "__component": "shared.quote",
                "title": art.get("quote_title", "Sazilo Store Commerce Insight"),
                "body": art.get("quote_body", "Empowering independent Nepali businesses with 0% commission and direct customer relationships.")
            }
        ]
    })

data = {
    "categories": categories,
    "authors": authors,
    "articles": formatted_articles,
    "global": global_info,
    "about": about_info
}

output_path = "/home/devil/blog/blog-cms/data/sazilo-data.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated {len(formatted_articles)} massive articles in {output_path}")
print(f"Categories: {len(categories)}")
print(f"Authors: {len(authors)}")
