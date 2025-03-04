import json
from datetime import datetime

def calculate_minutes(time_data):
    minutes = []
    total_estimate = 0
    total_actual = 0
    for entry in time_data:
        estimate = entry["estimate"]
        start = datetime.strptime(entry["start"], "%H:%M")
        end = datetime.strptime(entry["end"], "%H:%M")
        actual_minutes = (end - start).seconds // 60

        minutes.append(actual_minutes)
        total_estimate += estimate
        total_actual += actual_minutes

    return minutes, total_estimate, total_actual

def format_time(minutes):
    hours = minutes // 60
    mins = minutes % 60
    return f"{hours:02}:{mins:02}"

def process_file(day_nr):
    input_filename = f"{day_nr}_in.json"
    output_filename = f"{day_nr}_out.json"

    try:
        with open(input_filename, "r") as infile:
            data = json.load(infile)

        result = []
        for day_data in data:
            day = day_data["day"]
            time_data = day_data["time"]

            minutes, total_estimate, total_actual = calculate_minutes(time_data)

            result.append({
                "day": day,
                "minutes": minutes,
                "sum": {
                    "estimate": format_time(total_estimate),
                    "total": format_time(total_actual)
                }
            })

        with open(output_filename, "w") as outfile:
            json.dump(result, outfile, indent=2)

        print(f"File processed and saved as {output_filename}")

    except FileNotFoundError:
        print(f"Error: The file {input_filename} does not exist.")

# Get the current month with leading zero if necessary
current_month = datetime.now().strftime("%m")

process_file(current_month)
