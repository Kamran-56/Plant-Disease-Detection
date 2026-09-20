# 🌱 Plant Disease Detector

A deep learning project that classifies potato leaf images as **Healthy**, **Early Blight**, or **Late Blight** using a Convolutional Neural Network (CNN), served through a FastAPI backend and a simple web frontend.

## Overview

The project has three parts:

1. **Training** — a Jupyter notebook that trains a CNN on the [PlantVillage](https://www.kaggle.com/datasets/arjuntejaswi/plant-village) potato leaf dataset.
2. **API** — a FastAPI server that loads the trained model and exposes a `/predict` endpoint for image classification.
3. **PlantCare** — a lightweight HTML/CSS/JS frontend where a user uploads a leaf image and sees the predicted disease class and confidence score.

## Project Structure

```
Parent Folder/                 # choose your desired folder name and modify the path names accordingly
├── api/
│   └── main.py                # FastAPI app serving predictions
├── models/
│   └── model_1.keras          # Trained CNN model
├── Training/
│   ├── model-training.ipynb   # Notebook used to train the model
│   └── PlantVillage/          # Training dataset (Early Blight / Late Blight / Healthy)
├── PlantCare/
│   ├── index.html             # Upload UI
│   ├── app.js                 # Calls the API and renders results
│   └── style.css              # Styling
└── README.md
```

## Model

- **Architecture:** Sequential CNN — resizing/rescaling and data augmentation (random flip + rotation) followed by 6 Conv2D + MaxPooling blocks, then Dense layers with a softmax output.
- **Input size:** 256 × 256 RGB images
- **Classes:** `Early Blight`, `Late Blight`, `Healthy`
- **Training split:** 80% train / 10% validation / 10% test
- **Epochs:** 50, batch size 32
- **Dataset:** ~2,150 potato leaf images across the three classes (PlantVillage subset)

The trained model is saved at `models/model_1.keras`.

## Getting Started

### 1. Requirements

- Python 3.9+
- Node not required — the frontend is plain HTML/JS

Install the Python dependencies:

```bash
pip install fastapi uvicorn tensorflow numpy pillow python-multipart
```

### 2. Run the API

`api/main.py` currently loads the model from a hardcoded Windows path:

```python
MODEL = tf.keras.models.load_model(r"C:\AI ML Potato Project\models\model_1.keras")
```

Update this to a relative path before running elsewhere, e.g.:

```python
MODEL = tf.keras.models.load_model("../models/model_1.keras")
```

Then start the server from the `api` directory:

```bash
cd api
python main.py
```

The API will run at `http://localhost:8000`. Check it's alive:

```bash
curl http://localhost:8000/ping
```

### 3. Use the Frontend

Open `PlantCare/index.html` in a browser (or serve the folder with a simple HTTP server). Upload a potato leaf image and click **Upload & Predict** — the app calls the API's `/predict` endpoint and displays the predicted class and confidence percentage.

> Note: `app.js` calls the API at `http://127.0.0.1:8000/predict/` — make sure the API is running locally on port 8000, or update this URL to match your deployment.

### 4. Retrain the Model (optional)

Open `Training/model-training.ipynb` in Jupyter, point it at the `PlantVillage` dataset folder, and run all cells. The final cell saves the new model to `../models/model_{version}.keras`.

## API Reference

| Method | Endpoint    | Description                                  |
|--------|-------------|-----------------------------------------------|
| GET    | `/ping`     | Health check                                  |
| POST   | `/predict`  | Accepts an image file, returns predicted class and confidence |

**Example response:**

```json
{
  "class": "Late Blight",
  "confidence": 0.97
}
```

## Author

Kamran Nazir — Islamic University of Science & Technology (IUST), Kashmir

## Acknowledgements

The development of this project was guided by the following [Potato Disease Classification](https://youtube.com/playlist?list=PLeo1K3hjS3ut49PskOfLnE6WUoOp_2lsD) from "Code Basics", with modifications and adaptations made to suit the requirements of this project.
