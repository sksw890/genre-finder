
import os
from celery import Celery
import numpy
import requests
from datetime import datetime

from predict_example import (
    load_model,
    extract_audio_features,
)
from GenreFeatureData import (
    GenreFeatureData,
)

REDIS_URI = os.environ['REDIS_URI']
API_SECRET_TOKEN = os.environ['API_SECRET_TOKEN']
API_URL = os.environ['API_URL']

app = Celery('tasks',
    broker=REDIS_URI
)

def update_genre_classification_task(genre_classification_task_id: id, data: dict):
    url = API_URL + '/genre_classification_task/' + str(genre_classification_task_id)
    headers = {
        'Authorization': 'Bearer ' + API_SECRET_TOKEN
    }
    response = requests.patch(url, data=data, headers=headers)
    return response.json()

@app.task
def classify_genre(genre_classification_task_id: int):
    genre_classification_task_json = update_genre_classification_task(
        genre_classification_task_id,
        {'status':'LOADING_MODEL'})
    model = load_model("weights/model.json", "weights/model_weights.h5")

    update_genre_classification_task(genre_classification_task_id,
                                     {'status':'EXTRACTING_FEATURE'})
    audio_file_path = genre_classification_task_json['audioUploadFilePath']
    features = extract_audio_features(audio_file_path)

    update_genre_classification_task(genre_classification_task_id,
                                     {'status':'PREDICTING_GENRE'})
    prediction = model.predict(features)
    predicted_genre = GenreFeatureData().genre_list[numpy.argmax(prediction)]

    data =  {
        'status':'COMPLETE',
        'result': predicted_genre,
        'completedAt': str(datetime.now().isoformat())
    }
    update_genre_classification_task(genre_classification_task_id, data)

    return predicted_genre
