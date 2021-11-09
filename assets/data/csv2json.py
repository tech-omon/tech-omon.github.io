import csv, json, os

csvFilePath = r'products.csv'
jsonFilePath = r'products.json'

def make_json(csvFilePath, jsonFilePath, imgDict):
	data = {}
	with open(csvFilePath, encoding='utf-8') as csvf:
		csvReader = csv.DictReader(csvf)
		# next(csvReader)  # skip the headers
		for row in csvReader:
			imgName = row['fileName']
			if imgName in imgDict.keys():
				row['fileName'] = imgDict[imgName]
				data[imgName] = row
	with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
		jsonf.write(json.dumps(data, indent=4))

def getImageList(imagePath):
	imgList = os.listdir(imagePath)
	imgDict = {}
	for img in imgList:
		name = img.split('.')[0]
		imgDict[name] = img
	return imgDict

make_json(csvFilePath, jsonFilePath, getImageList('../img/products'))
