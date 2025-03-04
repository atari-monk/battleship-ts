def remove_comments(input_file, output_file):
    # Open the input file and read all lines
    with open(input_file, 'r') as infile:
        lines = infile.readlines()

    # Open the output file and write the modified content
    with open(output_file, 'w') as outfile:
        for line in lines:
            # Check if the line contains a comment (//)
            stripped_line = line.strip()
            
            # If there is a comment (i.e., // found), split the line at the first occurrence of //
            if '//' in stripped_line:
                line = line.split('//')[0]  # Keep only the part before the comment
            
            # Write the cleaned line back to the file, preserving its original indentation
            outfile.write(line)

    print("Comment removal completed and file saved.")

# Usage
input_filename = r'C:\atari-monk\code\battleship-ts\libs\battleship\ai\temp.ts'
output_filename = r'C:\atari-monk\code\battleship-ts\libs\battleship\ai\temp_no_comments.ts'

remove_comments(input_filename, output_filename)
