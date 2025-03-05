import json
import datetime

data_to_add = {
    "day": "",
    "time": [{"taskId": 0, "estimate": 0, "start": "", "end": ""}]
}

current_month = datetime.datetime.now().strftime("%m")
file_name = f"{current_month}_in.json"

try:
    with open(file_name, "r+", encoding="utf-8") as file:
        try:
            data = json.load(file)
            if not isinstance(data, list):
                data = []
        except json.JSONDecodeError:
            data = []
        data.append(data_to_add)
        file.seek(0)
        file.truncate()
        json.dump(data, file, indent=2)
except FileNotFoundError:
    with open(file_name, "w", encoding="utf-8") as file:
        json.dump([data_to_add], file, indent=2)
