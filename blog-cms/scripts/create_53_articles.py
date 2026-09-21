import json
import os

articles = []

def add_article(title, slug, description, category, cover, photographer, source_url, body_markdown, quote_title, quote_body):
    credit_line = f"\n\n---\n*Cover Image Credit: Photo by [{photographer}]({source_url}) on [Unsplash](https://unsplash.com?utm_source=sazilostore&utm_medium=referral) (Royalty-free under the Unsplash License)*"
    full_body = body_markdown.strip() + credit_line
    articles.append({
        "title": title,
        "slug": slug,
        "description": description,
        "category": category,
        "author": "Sazilo Store",
        "cover": cover,
        "photographer": photographer,
        "source_url": source_url,
        "blocks": [
            {
                "__component": "shared.rich-text",
                "body": full_body
            },
            {
                "__component": "shared.quote",
                "title": quote_title,
                "body": quote_body
            }
        ]
    })

print("Helper defined.")
