import json
import os

# Categories definition
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

