import csv, json, os

print(os.altsep)

IMAGE_BASE_FOLDER = '../img/products'

csvFilePath = r'products.csv'
jsonFilePath = r'products.json'

def make_json(csvFilePath, jsonFilePath):
	data = {}
	folderContents = {}
	missingCount = 0
	with open(csvFilePath, encoding='utf-8') as csvf:
		csvReader = csv.DictReader(csvf, skipinitialspace=True)
		# next(csvReader)  # skip the headers
		for row in csvReader:
			folderPath = os.path.join(row['Category'].strip(), row['SubCategory'].strip())
			if not folderPath in folderContents.keys():
				folderContents[folderPath] = os.listdir(IMAGE_BASE_FOLDER +'/'+ folderPath)
			
			imgName = row['fileName']
			for img in folderContents[folderPath]:
				if img.startswith(imgName):
					row['fileName'] = os.path.join(folderPath, img)
					data[imgName] = row
					break
			else:
				print(imgName, row)
				missingCount += 1
				
	print(missingCount)
	with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
		jsonf.write(json.dumps(data, indent=4))

make_json(csvFilePath, jsonFilePath)

