def remove_comments(input_file, output_file):
    with open(input_file, 'r') as infile:
        lines = infile.readlines()

    with open(output_file, 'w') as outfile:
        for line in lines:
            stripped_line = line.strip()

            if '//' in stripped_line:
                line = line.split('//')[0]

            outfile.write(line.rstrip() + '\n')

    print("Comment removal completed and file saved.")

input_filename = r'data\comments.md'
output_filename = r'data\no_comments.md'

remove_comments(input_filename, output_filename)
