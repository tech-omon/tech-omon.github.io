import os, json

basePath = "/Postcards"
images = os.listdir("../img/products/" + basePath)

result = {}

count = 0
for img in images:
  count += 1
  result[f"P{count}"] = {
    "fileName": f"{basePath}/{img}",
    "Category": "Postcards",
    "SubCategory": "",
    "Title": f"P{count}",
    "Dimension": "",
    "Media": ""
  }

json_object = json.dumps(result, indent = 4) 
print(json_object)
