import cv2
import numpy as np
import tensorflow as tf
from ultralytics import YOLO
from datetime import datetime


yolo = YOLO("SafeRoads.pt")
print("I AM BATMAN!!!!!")

'''
# Load tf model
interpreter = tf.lite.Interpreter(model_path='accident.tflite')
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()
'''

path = 'video1.mp4'
video_capture = cv2.VideoCapture(path)
frame_width = int(video_capture.get(3))
frame_height = int(video_capture.get(4))

size = (frame_width, frame_height)

#result = cv2.VideoWriter('filename3.avi', cv2.VideoWriter_fourcc(*'MJPG'), 10, size)
result = None

count = 0

while True:

    ret, frame = video_capture.read()


    if not ret:
        break

    '''
    img_array = tf.keras.utils.img_to_array(cv2.resize(frame, (250, 250)))
    img_batch = np.expand_dims(img_array, axis=0)
    interpreter.set_tensor(input_details[0]['index'], img_batch)
    interpreter.invoke()
    tf_model_predictions = interpreter.get_tensor(output_details[0]['index'])
    print(tf_model_predictions[0][0])
    '''

    
    predicted = yolo(frame)
    boxes = predicted[0].boxes.xyxy.cpu()
    clss = predicted[0].boxes.cls.cpu().tolist()
    confidences = predicted[0].boxes.conf.cpu().tolist()

    if len(clss) != 0:
        accident = 1
        if count == 0:
            time = datetime.now().strftime('%H_%M_%S')
            result = cv2.VideoWriter(f'{path.split(".")[0]}-{time}.avi', cv2.VideoWriter_fourcc(*'MJPG'), 10, size)
            count = 120
    else:
        accident = 0
        
    for box in boxes:
        box = [int(coord) for coord in box]
        cv2.rectangle(frame, (box[0], box[1]), (box[2], box[3]), (0, 255, 0), 2)
        cv2.putText(frame, str('accident'), (box[0], box[1] - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    

    #cv2.imshow('YOLO', frame)

    if result is not None and (count > 0 or accident != 0):
        result.write(frame)
        count -= 1

    if count == 0 and result is not None:
        result.release()


    if cv2.waitKey(1) & 0xFF == ord('q'):
        break


video_capture.release()
result.release()

cv2.destroyAllWindows()
