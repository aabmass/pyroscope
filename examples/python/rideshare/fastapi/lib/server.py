import os
import time
from fastapi import FastAPI
from lib.bike.bike import order_bike
from lib.car.car import order_car
from lib.scooter.scooter import order_scooter

import googlecloudprofiler

# Profiler initialization. It starts a daemon thread which continuously
# collects and uploads profiles. Best done as early as possible.
googlecloudprofiler.start(
    service='fastapi-rideshare',
    service_version='1.0.1',
    # verbose is the logging level. 0-error, 1-warning, 2-info,
    # 3-debug. It defaults to 0 (error) if not set.
    verbose=3,
    # project_id must be set if not running on GCP.
    # project_id='my-project-id',
)

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/bike")
def bike():
    order_bike(0.2)
    return "<p>Bike ordered</p>"


@app.get("/scooter")
def scooter():
    order_scooter(0.3)
    return "<p>Scooter ordered</p>"


@app.get("/car")
def car():
    order_car(0.4)
    return "<p>Car ordered</p>"


@app.get("/")
def environment():
    result = "<h1>environment vars:</h1>"
    for key, value in os.environ.items():
        result +=f"<p>{key}={value}</p>"
    return result
