from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import cv2
from ultralytics import YOLO
from datetime import datetime
import os

app = Flask(__name__, static_folder='processed_videos')
CORS(app)

yolo = YOLO("model/SafeRoads.pt")

processed_videos_folder = 'processed_videos'

def process_video(video_path):
    video_capture = cv2.VideoCapture(video_path)
    result_filename = None
    result = None
    count = 0

    while True:
        ret, frame = video_capture.read()

        if not ret:
            break

        predicted = yolo(frame)
        boxes = predicted[0].boxes.xyxy.cpu()
        clss = predicted[0].boxes.cls.cpu().tolist()
        confidences = predicted[0].boxes.conf.cpu().tolist()

        if len(clss) != 0:
            accident = 1
            if count == 0:
                time = datetime.now().strftime('%H_%M_%S')
                result_filename = f'{video_path.split(".")[0]}-{time}.webm'
                result = cv2.VideoWriter(os.path.join(processed_videos_folder, result_filename),
                                         cv2.VideoWriter_fourcc(*'vp80'), 10, (frame.shape[1], frame.shape[0]))
                count = 120
        else:
            accident = 0

        for box in boxes:
            box = [int(coord) for coord in box]
            cv2.rectangle(frame, (box[0], box[1]), (box[2], box[3]), (0, 255, 0), 2)
            cv2.putText(frame, str('accident'), (box[0], box[1] - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

        if result is not None and (count > 0 or accident != 0):
            result.write(frame)
            count -= 1

        if count == 0 and result is not None:
            result.release()

    video_capture.release()
    return {"processed_video_filename": result_filename}

video_paths = [
    'Gotham City.mp4',
    'Wakanda.mp4',
    'Kryptonopolis.mp4',
    'Vormir.mp4',
]

@app.route("/process_videos", methods=["POST"])
def handle_process_videos():
    results = []

    for video_path in video_paths:
        result = process_video(video_path)
        results.append(result)

    return jsonify(results)

# New route to serve processed videos
@app.route("/processed_videos/<filename>")
def serve_processed_video(filename):
    return send_from_directory(processed_videos_folder, filename)

if __name__ == "__main__":
    app.run(debug=True)
