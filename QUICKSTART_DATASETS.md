# 🚀 Quick Start Guide - Using Real Datasets in CityAssist

This guide will help you integrate the 5 Kaggle datasets into your CityAssist application.

## ⚡ 5-Minute Setup

### Step 1: Install Python Dependencies

```bash
pip install -r requirements.txt
```

**What gets installed:**
- Data processing: pandas, numpy
- Machine learning: tensorflow, scikit-learn
- API server: fastapi, uvicorn
- Data download: kaggle CLI

---

### Step 2: Set Up Kaggle API

1. **Create Kaggle Account:** Go to [kaggle.com](https://www.kaggle.com) and sign up (free)

2. **Get API Token:**
   - Go to https://www.kaggle.com/account
   - Scroll to "API" section
   - Click "Create New API Token"
   - This downloads `kaggle.json`

3. **Configure API:**
   ```bash
   # Linux/Mac
   mkdir -p ~/.kaggle
   mv ~/Downloads/kaggle.json ~/.kaggle/
   chmod 600 ~/.kaggle/kaggle.json

   # Windows
   mkdir %USERPROFILE%\.kaggle
   move %USERPROFILE%\Downloads\kaggle.json %USERPROFILE%\.kaggle\
   ```

---

### Step 3: Download Datasets

**Option A: Automatic (Recommended)**
```bash
bash scripts/download_datasets.sh
```

**Option B: Manual**
```bash
# Air Quality
kaggle datasets download -d rohanrao/air-quality-data-in-india -p raw_data/ --unzip

# Traffic Volume
kaggle datasets download -d ulrikthygepedersen/metro-interstate-traffic-volume -p raw_data/ --unzip

# Power Outages
kaggle datasets download -d ammaraahmad/electric-power-outages-us-2000-2016 -p raw_data/ --unzip

# Garbage Classification
kaggle datasets download -d asdasdasasdas/garbage-classification -p raw_data/ --unzip

# Weather Data
kaggle datasets download -d selfishgene/historical-hourly-weather-data -p raw_data/ --unzip
```

**Download Size:** ~2-3 GB total (be patient!)

---

### Step 4: Process the Data

```bash
python scripts/preprocess_data.py
```

**What happens:**
- Cleans and validates data
- Calculates AQI from pollutant levels
- Adds congestion levels to traffic data
- Creates frontend-ready JSON samples
- Saves processed files to `data/processed/`

**Output:**
```
📊 Processing Air Quality Data...
   Loaded 29,531 records
   ✓ Saved to data/processed/aqi_processed.csv
   ✓ Created sample JSON for frontend

🚗 Processing Traffic Data...
   Loaded 48,204 records
   ✓ Saved to data/processed/traffic_processed.csv
   ✓ Created sample JSON for frontend

✅ All preprocessing complete!
```

---

## 🎯 Using the Data in Your App

### Option 1: Enhanced Mock Data (Easiest)

The preprocessing script automatically updates your mock data with realistic values!

```javascript
// Frontend already uses this automatically
// data/alerts.json now has real PM2.5 values
// data/sensors.json has realistic AQI readings
```

**No code changes needed!** Just run preprocessing and reload your app.

---

### Option 2: Build ML Models (Advanced)

Create a Python API server with ML predictions:

```python
# api/main.py (create this file)
from fastapi import FastAPI
import joblib

app = FastAPI()

# Load your trained model
model = joblib.load('models/aqi_predictor.pkl')

@app.post("/api/v1/predict/aqi")
async def predict_aqi(hour: int, temp: float):
    prediction = model.predict([[hour, temp]])[0]
    return {"predicted_pm25": round(prediction, 2)}
```

**Start the API:**
```bash
uvicorn api.main:app --reload --port 8000
```

**Connect from Frontend:**
```typescript
// lib/api.ts
export async function predictAQI(data) {
  const response = await fetch('http://localhost:8000/api/v1/predict/aqi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}
```

---

## 📊 Dataset Usage Examples

### 1. Air Quality Monitoring

**Real Data Available:**
```json
{
  "city": "Delhi",
  "pm25": 180.5,
  "pm10": 210.3,
  "aqi": 165,
  "category": "Unhealthy"
}
```

**Use in App:**
- Show real-time AQI on map
- Send personalized health alerts
- Predict tomorrow's air quality
- Show historical trends

---

### 2. Traffic Predictions

**Real Data Available:**
```json
{
  "traffic_volume": 5545,
  "temp": 15.5,
  "weather": "Clear",
  "congestion_level": "high",
  "avg_speed_mph": 15
}
```

**Use in App:**
- Predict traffic for user's commute
- Suggest alternate routes
- Show congestion heatmap
- Alert about delays

---

### 3. Power Outage Alerts

**Real Data Available:**
```json
{
  "outage_duration_hours": 8.5,
  "customers_affected": 15000,
  "cause": "Equipment Failure",
  "restoration_eta": "2025-11-06T16:00:00Z"
}
```

**Use in App:**
- Alert users about outages
- Predict restoration time
- Show affected areas on map
- Historical outage patterns

---

### 4. Image Classification

**Real Data Available:**
- 6 categories: cardboard, glass, metal, paper, plastic, trash
- Thousands of labeled images

**Use in App:**
- Auto-categorize user reports
- Identify pothole vs garbage
- Suggest priority level
- Route to correct department

---

### 5. Weather Integration

**Real Data Available:**
```json
{
  "temperature": 15.5,
  "humidity": 65,
  "pressure": 1013.25,
  "wind_speed": 3.5
}
```

**Use in App:**
- Weather-based alerts
- Predict incidents (flooding, fallen trees)
- Traffic prediction features
- Energy usage forecasting

---

## 🔥 Quick ML Model Training

### Train AQI Predictor (5 minutes)

```python
# quick_train.py
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib

# Load processed data
df = pd.read_csv('data/processed/aqi_processed.csv')

# Prepare features
features = ['hour', 'day_of_week', 'month', 'temperature']
X = df[features].fillna(0)
y = df['PM2.5'].fillna(0)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Evaluate
score = model.score(X_test, y_test)
print(f"Model R² Score: {score:.3f}")

# Save model
joblib.dump(model, 'models/aqi_predictor.pkl')
print("✅ Model saved to models/aqi_predictor.pkl")
```

**Run it:**
```bash
python quick_train.py
```

---

## 📁 File Structure After Setup

```
CityAssist/
├── raw_data/                    # Downloaded Kaggle datasets (2-3 GB)
│   ├── city_day.csv            # Air quality
│   ├── Metro_Interstate_Traffic_Volume.csv
│   ├── DOE_Electric_Disturbance_Events.xlsx
│   ├── garbage_classification/ # Images
│   └── *.csv                   # Weather files
│
├── data/
│   ├── processed/              # Cleaned data (NEW)
│   │   ├── aqi_processed.csv
│   │   ├── traffic_processed.csv
│   │   ├── aqi_sample.json
│   │   └── traffic_sample.json
│   │
│   └── *.json                  # Mock data (updated with real values)
│
├── models/                     # Trained ML models (NEW)
│   ├── aqi_predictor.pkl
│   ├── traffic_predictor.pkl
│   └── image_classifier.h5
│
└── scripts/
    ├── download_datasets.sh
    ├── preprocess_data.py
    └── train_models.py
```

---

## 🐛 Troubleshooting

### "kaggle: command not found"
```bash
pip install kaggle
# Or add to PATH if needed
```

### "401 - Unauthorized"
- Check kaggle.json is in ~/.kaggle/
- Verify API token is not expired
- Re-download from kaggle.com/account

### "No space left on device"
- Datasets are ~2-3 GB
- Free up disk space
- Download one dataset at a time

### "Dataset not found"
- Ensure you're logged into Kaggle
- Accept dataset terms on website first
- Check dataset URL is correct

---

## ⚡ Speed Tips

**Faster Processing:**
```python
# Use only recent data
df = df[df['Date'] >= '2023-01-01']

# Sample large datasets
df = df.sample(n=10000)
```

**Parallel Downloads:**
```bash
# Download multiple datasets simultaneously
kaggle datasets download ... &
kaggle datasets download ... &
wait
```

---

## 🎓 Learning Resources

**Understanding the Data:**
- [AQI Calculation Guide](https://www.airnow.gov/aqi/aqi-basics/)
- [Traffic Prediction Papers](https://arxiv.org/abs/1909.05207)
- [Image Classification Tutorial](https://www.tensorflow.org/tutorials/images/classification)

**Video Tutorials:**
- Kaggle: How to use datasets (kaggle.com/learn)
- FastAPI crash course (YouTube)
- React + Python integration (YouTube)

---

## 🚀 Next Steps

1. ✅ **Download & Process** - Follow steps 1-4 above
2. 📊 **Explore Data** - Open Jupyter and analyze
3. 🤖 **Train Models** - Start with simple baselines
4. 🔌 **Build API** - Create FastAPI endpoints
5. 🎨 **Update Frontend** - Connect to real predictions
6. 🎉 **Demo Time!** - Show off your data-powered app

---

**Need Help?** Check [DATASETS.md](./DATASETS.md) for detailed documentation!

**Ready to go?** Run this:
```bash
pip install -r requirements.txt && \
bash scripts/download_datasets.sh && \
python scripts/preprocess_data.py
```

Then refresh your app and see realistic data! 🎉
