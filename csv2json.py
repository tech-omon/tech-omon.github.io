import csv, json

csvFilePath = r'assets/products.csv'
jsonFilePath = r'assets/products.json'

def make_json(csvFilePath, jsonFilePath):
	data = {}
	count = 1
	with open(csvFilePath, encoding='utf-8') as csvf:
		csvReader = csv.DictReader(csvf)
		for rows in csvReader:
			data[count] = rows
			count += 1
	with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
		jsonf.write(json.dumps(data, indent=4))

make_json(csvFilePath, jsonFilePath)
