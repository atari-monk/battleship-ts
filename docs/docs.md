# **Docs Template**  

### **Folder Structure**  
Template files to set up a new project with a `docs` folder. It includes an organized structure:  

```plaintext
docs/
└── log/
    └── 2025/
        ├── task/
        │   └── 03.md
        └── time/
            ├── 03_in.json
            ├── add_day.py
            ├── calculate_month_time.py
            └── generate_month_file.py
```  

### **Purpose**  
- Tracks project tasks and time.  
- Scripts are placed within the structure to handle time calculations.  

### **Potential Improvements**  
These scripts could be centralized in a separate repository and installed via a pip package. However:  
- Right now, it’s not worth spending an hour setting that up.  
- These scripts directly operate on files within the `time` folder, and centralizing them would break that.  
- Even if centralized, an additional script would still be needed to run them within each project.  

For now, the current structure remains the most practical approach.  
