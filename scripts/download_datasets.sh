#!/bin/bash
# CityAssist - Kaggle Dataset Download Script
#
# Prerequisites:
# 1. Install Kaggle CLI: pip install kaggle
# 2. Set up Kaggle API credentials: https://www.kaggle.com/docs/api
#    - Go to kaggle.com -> Account -> Create New API Token
#    - Place kaggle.json in ~/.kaggle/

echo "🚀 CityAssist Dataset Download Script"
echo "======================================"
echo ""

# Create directories
mkdir -p raw_data
mkdir -p data/processed

echo "📥 Downloading datasets from Kaggle..."
echo ""

# 1. Air Quality Data (India)
echo "1/5 Downloading Air Quality Data (India)..."
kaggle datasets download -d rohanrao/air-quality-data-in-india -p raw_data/ --unzip
echo "✓ Air Quality Data downloaded"
echo ""

# 2. Metro Interstate Traffic Volume
echo "2/5 Downloading Metro Interstate Traffic Volume..."
kaggle datasets download -d ulrikthygepedersen/metro-interstate-traffic-volume -p raw_data/ --unzip
echo "✓ Traffic Volume Data downloaded"
echo ""

# 3. Electric Power Outages
echo "3/5 Downloading Electric Power Outages..."
kaggle datasets download -d ammaraahmad/electric-power-outages-us-2000-2016 -p raw_data/ --unzip
echo "✓ Power Outages Data downloaded"
echo ""

# 4. Garbage Classification
echo "4/5 Downloading Garbage Classification Dataset..."
kaggle datasets download -d asdasdasasdas/garbage-classification -p raw_data/ --unzip
echo "✓ Garbage Classification Data downloaded"
echo ""

# 5. Historical Hourly Weather Data
echo "5/5 Downloading Historical Hourly Weather Data..."
kaggle datasets download -d selfishgene/historical-hourly-weather-data -p raw_data/ --unzip
echo "✓ Weather Data downloaded"
echo ""

echo "======================================"
echo "✅ All datasets downloaded successfully!"
echo ""
echo "📂 Location: ./raw_data/"
echo ""
echo "Next steps:"
echo "1. Run preprocessing: python scripts/preprocess_data.py"
echo "2. Train models: python scripts/train_models.py"
echo "3. Start API server: uvicorn api.main:app --reload"
