import json
import os
from datetime import datetime

# Get the current date
current_date = datetime.now()
month = current_date.strftime("%m")
date_str = current_date.strftime("%Y-%m-%d")

# Prepare the data structure
data = [
    {
        "day": date_str,
        "time": [{"estimate": 0, "start": "00:00", "end": "00:00"}]
    }
]

# Prepare the filename using the current month
filename = f"{month.zfill(2)}_in.json"

# Check if the file already exists
if not os.path.exists(filename):
    # Write to the JSON file
    with open(filename, 'w') as f:
        json.dump(data, f, indent=2)
else:
    print(f"File {filename} already exists. Not saving.")
