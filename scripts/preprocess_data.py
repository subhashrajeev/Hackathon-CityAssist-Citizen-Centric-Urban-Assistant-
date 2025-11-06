#!/usr/bin/env python3
"""
CityAssist - Data Preprocessing Script

This script processes raw Kaggle datasets and prepares them for:
1. Frontend mock data enhancement
2. ML model training
3. API integration

Usage:
    python scripts/preprocess_data.py
"""

import pandas as pd
import numpy as np
import json
from datetime import datetime, timedelta
from pathlib import Path

# Configure paths
RAW_DATA_DIR = Path("raw_data")
PROCESSED_DATA_DIR = Path("data/processed")
MOCK_DATA_DIR = Path("data")

PROCESSED_DATA_DIR.mkdir(parents=True, exist_ok=True)


def calculate_aqi_from_pm25(pm25):
    """
    Calculate AQI from PM2.5 using EPA breakpoints
    Source: https://www.airnow.gov/aqi/aqi-calculator/
    """
    if pm25 <= 12.0:
        return ((50 - 0) / (12.0 - 0.0)) * (pm25 - 0.0) + 0
    elif pm25 <= 35.4:
        return ((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51
    elif pm25 <= 55.4:
        return ((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101
    elif pm25 <= 150.4:
        return ((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151
    elif pm25 <= 250.4:
        return ((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201
    else:
        return ((500 - 301) / (500.4 - 250.5)) * (pm25 - 250.5) + 301


def get_aqi_category(aqi):
    """Get AQI category and health message"""
    if aqi <= 50:
        return "Good", "Air quality is satisfactory"
    elif aqi <= 100:
        return "Moderate", "Acceptable for most people"
    elif aqi <= 150:
        return "Unhealthy for Sensitive Groups", "Sensitive groups may experience health effects"
    elif aqi <= 200:
        return "Unhealthy", "Everyone may begin to experience health effects"
    elif aqi <= 300:
        return "Very Unhealthy", "Health alert: everyone may experience serious effects"
    else:
        return "Hazardous", "Health warnings of emergency conditions"


def process_air_quality_data():
    """Process Air Quality India dataset"""
    print("📊 Processing Air Quality Data...")

    # Try to find the CSV file (name may vary)
    aqi_files = list(RAW_DATA_DIR.glob("**/city_day.csv"))
    if not aqi_files:
        aqi_files = list(RAW_DATA_DIR.glob("**/*air*.csv"))

    if not aqi_files:
        print("⚠️  Air quality data file not found. Skipping...")
        return

    df = pd.read_csv(aqi_files[0])
    print(f"   Loaded {len(df)} records")

    # Filter recent data and select cities
    df['Date'] = pd.to_datetime(df['Date'])
    recent_df = df[df['Date'] >= '2020-01-01']

    # Select major cities
    cities = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai']
    recent_df = recent_df[recent_df['City'].isin(cities)]

    # Calculate AQI from PM2.5 if not present
    if 'PM2.5' in recent_df.columns and 'AQI' not in recent_df.columns:
        recent_df['AQI'] = recent_df['PM2.5'].apply(
            lambda x: calculate_aqi_from_pm25(x) if pd.notna(x) else None
        )

    # Add categories
    recent_df['AQI_Category'] = recent_df['AQI'].apply(
        lambda x: get_aqi_category(x)[0] if pd.notna(x) else None
    )

    # Save processed data
    output_file = PROCESSED_DATA_DIR / 'aqi_processed.csv'
    recent_df.to_csv(output_file, index=False)
    print(f"   ✓ Saved to {output_file}")

    # Create sample data for frontend
    sample = recent_df.head(100).to_dict('records')
    with open(PROCESSED_DATA_DIR / 'aqi_sample.json', 'w') as f:
        json.dump(sample, f, indent=2, default=str)
    print("   ✓ Created sample JSON for frontend")


def process_traffic_data():
    """Process Metro Interstate Traffic Volume dataset"""
    print("\n🚗 Processing Traffic Data...")

    traffic_files = list(RAW_DATA_DIR.glob("**/*traffic*.csv")) + \
                    list(RAW_DATA_DIR.glob("**/Metro*.csv"))

    if not traffic_files:
        print("⚠️  Traffic data file not found. Skipping...")
        return

    df = pd.read_csv(traffic_files[0])
    print(f"   Loaded {len(df)} records")

    # Parse datetime
    df['date_time'] = pd.to_datetime(df['date_time'])

    # Feature engineering
    df['hour'] = df['date_time'].dt.hour
    df['day_of_week'] = df['date_time'].dt.dayofweek
    df['month'] = df['date_time'].dt.month
    df['is_weekend'] = df['day_of_week'].isin([5, 6]).astype(int)

    # Add congestion level
    df['congestion_level'] = pd.cut(
        df['traffic_volume'],
        bins=[0, 2000, 4000, 7000],
        labels=['low', 'medium', 'high']
    )

    # Calculate average speed (inverse of volume, normalized)
    max_volume = df['traffic_volume'].max()
    df['avg_speed_mph'] = 60 * (1 - df['traffic_volume'] / max_volume)

    # Save processed data
    output_file = PROCESSED_DATA_DIR / 'traffic_processed.csv'
    df.to_csv(output_file, index=False)
    print(f"   ✓ Saved to {output_file}")

    # Create sample for frontend
    sample = df.tail(100).to_dict('records')
    with open(PROCESSED_DATA_DIR / 'traffic_sample.json', 'w') as f:
        json.dump(sample, f, indent=2, default=str)
    print("   ✓ Created sample JSON for frontend")


def process_power_outage_data():
    """Process Electric Power Outages dataset"""
    print("\n⚡ Processing Power Outage Data...")

    outage_files = list(RAW_DATA_DIR.glob("**/*outage*.csv")) + \
                   list(RAW_DATA_DIR.glob("**/*power*.csv"))

    if not outage_files:
        print("⚠️  Power outage data file not found. Skipping...")
        return

    df = pd.read_csv(outage_files[0])
    print(f"   Loaded {len(df)} records")

    # Process dates if present
    date_columns = [col for col in df.columns if 'date' in col.lower() or 'time' in col.lower()]
    for col in date_columns[:2]:  # Process first two date columns
        try:
            df[col] = pd.to_datetime(df[col])
        except:
            pass

    # Calculate duration if start/end times present
    if len(date_columns) >= 2:
        try:
            df['outage_duration_hours'] = (
                df[date_columns[1]] - df[date_columns[0]]
            ).dt.total_seconds() / 3600
        except:
            pass

    # Save processed data
    output_file = PROCESSED_DATA_DIR / 'outages_processed.csv'
    df.to_csv(output_file, index=False)
    print(f"   ✓ Saved to {output_file}")

    # Create sample
    sample = df.head(50).to_dict('records')
    with open(PROCESSED_DATA_DIR / 'outages_sample.json', 'w') as f:
        json.dump(sample, f, indent=2, default=str)
    print("   ✓ Created sample JSON for frontend")


def process_weather_data():
    """Process Historical Hourly Weather Data"""
    print("\n🌤️  Processing Weather Data...")

    weather_files = list(RAW_DATA_DIR.glob("**/*weather*.csv")) + \
                    list(RAW_DATA_DIR.glob("**/temperature*.csv"))

    if not weather_files:
        print("⚠️  Weather data file not found. Skipping...")
        return

    # This dataset often has multiple files, process the first one
    df = pd.read_csv(weather_files[0])
    print(f"   Loaded {len(df)} records")

    # Basic processing
    if 'datetime' in df.columns:
        df['datetime'] = pd.to_datetime(df['datetime'])

    # Save processed data
    output_file = PROCESSED_DATA_DIR / 'weather_processed.csv'
    df.to_csv(output_file, index=False)
    print(f"   ✓ Saved to {output_file}")

    # Create sample
    sample = df.tail(100).to_dict('records')
    with open(PROCESSED_DATA_DIR / 'weather_sample.json', 'w') as f:
        json.dump(sample, f, indent=2, default=str)
    print("   ✓ Created sample JSON for frontend")


def update_mock_data_with_realistic_values():
    """Update frontend mock data with more realistic values from processed datasets"""
    print("\n🔄 Updating mock data with realistic values...")

    # Update alerts.json with realistic AQI values
    try:
        aqi_sample_file = PROCESSED_DATA_DIR / 'aqi_sample.json'
        if aqi_sample_file.exists():
            with open(aqi_sample_file, 'r') as f:
                aqi_data = json.load(f)

            # Update one of the alerts
            alerts_file = MOCK_DATA_DIR / 'alerts.json'
            with open(alerts_file, 'r') as f:
                alerts = json.load(f)

            if aqi_data and len(alerts) > 0:
                # Use real PM2.5 value
                real_pm25 = aqi_data[0].get('PM2.5', 180)
                alerts[0]['message'] = f"PM2.5 reached {real_pm25:.1f} µg/m³. Consider wearing a mask outdoors."

            with open(alerts_file, 'w') as f:
                json.dump(alerts, f, indent=2)
            print("   ✓ Updated alerts.json with real AQI values")
    except Exception as e:
        print(f"   ⚠️  Could not update alerts: {e}")


def generate_summary():
    """Generate a summary of processed data"""
    print("\n" + "="*60)
    print("📈 PROCESSING SUMMARY")
    print("="*60)

    processed_files = list(PROCESSED_DATA_DIR.glob("*.csv"))

    for file in processed_files:
        df = pd.read_csv(file)
        print(f"\n{file.name}:")
        print(f"   Records: {len(df):,}")
        print(f"   Columns: {len(df.columns)}")
        print(f"   Size: {file.stat().st_size / 1024:.1f} KB")

    print("\n" + "="*60)
    print("✅ All preprocessing complete!")
    print("="*60)
    print("\nNext steps:")
    print("1. Review processed files in: data/processed/")
    print("2. Train ML models: python scripts/train_models.py")
    print("3. Start API server: uvicorn api.main:app --reload")


def main():
    """Main preprocessing pipeline"""
    print("🚀 CityAssist Data Preprocessing Pipeline")
    print("="*60)

    # Check if raw data exists
    if not RAW_DATA_DIR.exists():
        print("\n❌ Error: raw_data/ directory not found!")
        print("Please run: bash scripts/download_datasets.sh")
        return

    # Process each dataset
    process_air_quality_data()
    process_traffic_data()
    process_power_outage_data()
    process_weather_data()

    # Update mock data
    update_mock_data_with_realistic_values()

    # Generate summary
    generate_summary()


if __name__ == "__main__":
    main()
