# CityAssist - Data Science Resources & Integration Guide

## 📊 Official Datasets for CityAssist

Your manager has provided high-quality, real-world datasets from Kaggle that can be integrated into the CityAssist platform. These datasets will power the AI/ML features and provide realistic data for the application.

---

## 🌍 Available Datasets

### 1. Air Quality Data (India) - Station-Level AQI
**Source:** https://www.kaggle.com/datasets/rohanrao/air-quality-data-in-india

**Description:**
- Real air quality monitoring data from India
- Station-level AQI (Air Quality Index) readings
- Multiple pollutant measurements (PM2.5, PM10, NO2, SO2, CO, O3)
- Historical time-series data

**Use Cases in CityAssist:**
- ✅ Real-time AQI alerts and notifications
- ✅ Air quality predictions and forecasting
- ✅ Personalized health recommendations based on AQI
- ✅ Historical trends and seasonal patterns
- ✅ Zone-wise air quality mapping

**Integration Points:**
- `/data/sensors.json` - Update with realistic AQI values
- `/app/home/page.tsx` - Display AQI alerts
- `/app/map/page.tsx` - Show AQI heatmap
- ML Model: Time-series forecasting for AQI prediction

**Sample Data Structure:**
```json
{
  "station_id": "Delhi_Anand_Vihar",
  "city": "Delhi",
  "datetime": "2025-11-06T10:00:00Z",
  "pm25": 180.5,
  "pm10": 210.3,
  "no2": 45.2,
  "so2": 15.8,
  "co": 1.2,
  "o3": 35.4,
  "aqi": 165,
  "aqi_category": "Unhealthy"
}
```

---

### 2. Metro Interstate Traffic Volume
**Source:** https://www.kaggle.com/datasets/ulrikthygepedersen/metro-interstate-traffic-volume

**Description:**
- Hourly traffic volume data with weather features
- Temperature, precipitation, cloud cover
- Holiday indicators
- Traffic patterns and congestion levels

**Use Cases in CityAssist:**
- ✅ Real-time traffic alerts and notifications
- ✅ Route optimization and alternate route suggestions
- ✅ Traffic prediction based on weather and time
- ✅ Commute time estimation
- ✅ Event-based traffic management

**Integration Points:**
- `/data/alerts.json` - Traffic alerts
- `/app/map/page.tsx` - Traffic heatmap and congestion zones
- ML Model: Traffic volume prediction using weather + time features

**Sample Data Structure:**
```json
{
  "datetime": "2025-11-06T08:00:00Z",
  "traffic_volume": 5545,
  "temp": 288.28,
  "rain_1h": 0.0,
  "snow_1h": 0.0,
  "clouds_all": 40,
  "weather_main": "Clear",
  "congestion_level": "high",
  "avg_speed_mph": 15
}
```

---

### 3. Electric Power Outages (US 2000-2016)
**Source:** https://www.kaggle.com/datasets/ammaraahmad/electric-power-outages-us-2000-2016

**Description:**
- Historical power outage events
- Outage duration, affected customers
- Cause of outage (weather, equipment failure, etc.)
- Geographic distribution

**Use Cases in CityAssist:**
- ✅ Power outage alerts and notifications
- ✅ Outage duration prediction
- ✅ Service restoration ETA estimation
- ✅ Historical outage pattern analysis
- ✅ Proactive maintenance scheduling

**Integration Points:**
- `/data/alerts.json` - Utility outage alerts
- `/app/status/page.tsx` - Service status dashboard
- ML Model: Outage duration prediction and cause classification

**Sample Data Structure:**
```json
{
  "outage_id": "PWR_2025_1001",
  "datetime_start": "2025-11-06T06:00:00Z",
  "datetime_end": "2025-11-06T14:30:00Z",
  "duration_hours": 8.5,
  "customers_affected": 15000,
  "cause": "Equipment Failure",
  "zone": "North District",
  "restoration_eta": "2025-11-06T16:00:00Z"
}
```

---

### 4. Garbage Classification Dataset
**Source:** https://www.kaggle.com/datasets/asdasdasasdas/garbage-classification

**Description:**
- Images of different types of waste
- Categories: cardboard, glass, metal, paper, plastic, trash
- Suitable for image classification models

**Use Cases in CityAssist:**
- ✅ Automatic issue categorization from citizen reports
- ✅ Image-based report triage (pothole vs garbage vs tree fall)
- ✅ Waste management optimization
- ✅ Auto-routing reports to correct departments
- ✅ Priority scoring based on image analysis

**Integration Points:**
- `/app/report/page.tsx` - Auto-classify uploaded images
- `/data/incidents.json` - Automatically categorized incidents
- ML Model: CNN for image classification (MobileNet, ResNet, EfficientNet)

**Sample API Response:**
```json
{
  "image_url": "/uploads/report_12345.jpg",
  "predicted_category": "pothole",
  "confidence": 0.92,
  "alternative_predictions": [
    {"category": "road_damage", "confidence": 0.06},
    {"category": "garbage", "confidence": 0.02}
  ],
  "suggested_priority": "high",
  "suggested_department": "Public Works"
}
```

---

### 5. Historical Hourly Weather Data
**Source:** https://www.kaggle.com/datasets/selfishgene/historical-hourly-weather-data

**Description:**
- Hourly weather measurements from multiple cities
- Temperature, humidity, pressure, wind speed
- Weather descriptions and conditions
- Multi-year historical data

**Use Cases in CityAssist:**
- ✅ Weather-based alerts (storms, extreme heat/cold)
- ✅ Incident prediction (flooding, fallen trees)
- ✅ Traffic prediction using weather features
- ✅ Energy consumption forecasting
- ✅ Personalized recommendations based on weather

**Integration Points:**
- `/data/alerts.json` - Weather-based alerts
- All prediction models - Weather as a feature
- ML Model: Weather forecasting and anomaly detection

**Sample Data Structure:**
```json
{
  "datetime": "2025-11-06T10:00:00Z",
  "city": "New York",
  "temperature": 15.5,
  "humidity": 65,
  "pressure": 1013.25,
  "wind_speed": 3.5,
  "wind_direction": 180,
  "weather_description": "Clear sky",
  "precipitation": 0.0
}
```

---

## 🔧 Integration Workflow

### Phase 1: Data Acquisition & Preparation

```bash
# 1. Download datasets from Kaggle
# Create a Kaggle account and accept dataset terms

# 2. Install Kaggle CLI
pip install kaggle

# 3. Download datasets
kaggle datasets download -d rohanrao/air-quality-data-in-india
kaggle datasets download -d ulrikthygepedersen/metro-interstate-traffic-volume
kaggle datasets download -d ammaraahmad/electric-power-outages-us-2000-2016
kaggle datasets download -d asdasdasasdas/garbage-classification
kaggle datasets download -d selfishgene/historical-hourly-weather-data

# 4. Extract and organize
unzip '*.zip' -d raw_data/
```

### Phase 2: Data Preprocessing (Python)

```python
# scripts/preprocess_data.py

import pandas as pd
import numpy as np
from datetime import datetime

# Air Quality Data
def process_aqi_data():
    df = pd.read_csv('raw_data/air_quality_india.csv')

    # Clean and transform
    df['datetime'] = pd.to_datetime(df['datetime'])
    df['aqi'] = calculate_aqi(df)
    df['aqi_category'] = df['aqi'].apply(get_aqi_category)

    # Export for CityAssist
    df.to_json('data/aqi_processed.json', orient='records')

def calculate_aqi(df):
    # Implement AQI calculation based on EPA standards
    # https://www.airnow.gov/aqi/aqi-calculator/
    pass

def get_aqi_category(aqi):
    if aqi <= 50: return "Good"
    elif aqi <= 100: return "Moderate"
    elif aqi <= 150: return "Unhealthy for Sensitive Groups"
    elif aqi <= 200: return "Unhealthy"
    elif aqi <= 300: return "Very Unhealthy"
    else: return "Hazardous"

# Traffic Data
def process_traffic_data():
    df = pd.read_csv('raw_data/Metro_Interstate_Traffic_Volume.csv')

    # Feature engineering
    df['hour'] = pd.to_datetime(df['date_time']).dt.hour
    df['day_of_week'] = pd.to_datetime(df['date_time']).dt.dayofweek
    df['congestion_level'] = pd.cut(
        df['traffic_volume'],
        bins=[0, 2000, 4000, 7000],
        labels=['low', 'medium', 'high']
    )

    df.to_json('data/traffic_processed.json', orient='records')

# Run all preprocessing
if __name__ == '__main__':
    process_aqi_data()
    process_traffic_data()
    # ... process other datasets
```

### Phase 3: ML Model Training

```python
# models/train_models.py

from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import joblib

# AQI Prediction Model
def train_aqi_model():
    df = pd.read_json('data/aqi_processed.json')

    features = ['hour', 'day_of_week', 'month', 'temp', 'humidity']
    X = df[features]
    y = df['pm25']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

    model = RandomForestRegressor(n_estimators=100)
    model.fit(X_train, y_train)

    # Save model
    joblib.dump(model, 'models/aqi_predictor.pkl')

    print(f"Model R² Score: {model.score(X_test, y_test)}")

# Image Classification Model
def train_image_classifier():
    from tensorflow.keras.applications import MobileNetV2
    from tensorflow.keras.preprocessing.image import ImageDataGenerator

    # Load garbage classification dataset
    datagen = ImageDataGenerator(
        rescale=1./255,
        validation_split=0.2
    )

    train_generator = datagen.flow_from_directory(
        'raw_data/garbage_classification/',
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        subset='training'
    )

    # Use transfer learning
    base_model = MobileNetV2(
        weights='imagenet',
        include_top=False,
        input_shape=(224, 224, 3)
    )

    # Fine-tune and train
    # ... training code

    model.save('models/image_classifier.h5')
```

### Phase 4: API Integration (FastAPI)

```python
# api/main.py

from fastapi import FastAPI, File, UploadFile
from pydantic import BaseModel
import joblib
import numpy as np
from PIL import Image
import tensorflow as tf

app = FastAPI()

# Load models
aqi_model = joblib.load('models/aqi_predictor.pkl')
image_model = tf.keras.models.load_model('models/image_classifier.h5')

class AQIPredictionRequest(BaseModel):
    hour: int
    day_of_week: int
    month: int
    temp: float
    humidity: float

@app.post("/api/v1/predict/aqi")
async def predict_aqi(request: AQIPredictionRequest):
    features = np.array([[
        request.hour,
        request.day_of_week,
        request.month,
        request.temp,
        request.humidity
    ]])

    prediction = aqi_model.predict(features)[0]

    return {
        "predicted_pm25": round(prediction, 2),
        "predicted_aqi": round(pm25_to_aqi(prediction), 0),
        "category": get_aqi_category(pm25_to_aqi(prediction)),
        "confidence": 0.85
    }

@app.post("/api/v1/classify/image")
async def classify_image(file: UploadFile = File(...)):
    # Read and preprocess image
    image = Image.open(file.file)
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    image_array = np.expand_dims(image_array, axis=0)

    # Predict
    predictions = image_model.predict(image_array)
    class_idx = np.argmax(predictions[0])
    confidence = float(predictions[0][class_idx])

    classes = ['pothole', 'garbage', 'tree_fall', 'streetlight', 'water_leak']

    return {
        "predicted_category": classes[class_idx],
        "confidence": confidence,
        "suggested_priority": "high" if confidence > 0.8 else "medium"
    }

@app.get("/api/v1/traffic/predict")
async def predict_traffic(hour: int, temp: float, weather: str):
    # Traffic volume prediction
    pass
```

---

## 📱 Frontend Integration Updates

### Update API Service Layer

```typescript
// lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export async function predictAQI(data: {
  hour: number
  day_of_week: number
  month: number
  temp: number
  humidity: number
}) {
  const response = await fetch(`${API_BASE_URL}/api/v1/predict/aqi`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export async function classifyImage(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(`${API_BASE_URL}/api/v1/classify/image`, {
    method: 'POST',
    body: formData
  })
  return response.json()
}

export async function getRealTimeAQI(zone: string) {
  const response = await fetch(`${API_BASE_URL}/api/v1/aqi/realtime?zone=${zone}`)
  return response.json()
}
```

### Update Report Page with Image Classification

```typescript
// app/report/page.tsx
'use client'
import { useState } from 'react'
import { classifyImage } from '@/lib/api'

export default function ReportPage() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [classification, setClassification] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setImageFile(file)
    setLoading(true)

    try {
      const result = await classifyImage(file)
      setClassification(result)

      // Auto-fill form based on classification
      // ...
    } catch (error) {
      console.error('Classification failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {loading && <p>Analyzing image...</p>}
      {classification && (
        <div>
          <p>Detected: {classification.predicted_category}</p>
          <p>Confidence: {(classification.confidence * 100).toFixed(1)}%</p>
          <p>Priority: {classification.suggested_priority}</p>
        </div>
      )}
    </div>
  )
}
```

---

## 🎯 Recommended Implementation Order

### Week 1: Data Setup
- [ ] Download all datasets from Kaggle
- [ ] Set up data preprocessing pipeline
- [ ] Clean and validate data
- [ ] Create processed JSON files

### Week 2: ML Model Development
- [ ] Train AQI prediction model
- [ ] Train traffic prediction model
- [ ] Train image classification model
- [ ] Evaluate model performance

### Week 3: Backend API
- [ ] Set up FastAPI server
- [ ] Implement prediction endpoints
- [ ] Add authentication and rate limiting
- [ ] Deploy models as services

### Week 4: Frontend Integration
- [ ] Update mock data with realistic values
- [ ] Connect frontend to ML APIs
- [ ] Add real-time predictions
- [ ] Testing and optimization

---

## 📊 Expected Model Performance

Based on these datasets, here are realistic performance targets:

| Model | Metric | Target |
|-------|--------|--------|
| AQI Prediction | RMSE | < 20 µg/m³ |
| Traffic Volume | MAPE | < 15% |
| Outage Duration | MAE | < 2 hours |
| Image Classification | Accuracy | > 85% |

---

## 🔗 Additional Resources

**Kaggle Notebooks:**
- Browse community notebooks for each dataset
- Find preprocessing and modeling examples
- Learn from top-performing solutions

**Documentation:**
- AQI Calculation: https://www.airnow.gov/aqi/aqi-basics/
- Traffic Prediction: https://arxiv.org/abs/1909.05207
- Image Classification: https://keras.io/examples/vision/

---

## 💡 Next Steps

1. **Download the datasets** using Kaggle CLI
2. **Run preprocessing scripts** to clean and prepare data
3. **Train initial models** with baseline algorithms
4. **Set up FastAPI server** with model endpoints
5. **Update frontend** to consume real ML predictions
6. **Monitor and improve** model performance

---

**Questions or need help with integration? Check the main README or contact the data science team!**
