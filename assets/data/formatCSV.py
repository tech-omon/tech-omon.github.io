import csv

csvFilePath = r'original.csv'

categories = {}

with open(csvFilePath, encoding='utf-8') as csvf:
  csvReader = csv.DictReader(csvf)
  # next(csvReader)  # skip the headers
  count = 0
  for row in csvReader:
    cat = row['Category'].strip()
    if cat.startswith('PRINT'):
      main = 'Prints'
      sub = cat.split('-')[-1].strip()
    elif cat.startswith('Painting'):
      main = 'Painting'
      sub = ''
    elif cat.startswith('Stationery'):
      main = 'Stationery'
      if 'envelopes' in cat:
        sub = 'Envelopes'
      else: sub = 'Notebooks'
    elif cat.startswith('tote'):
      main = 'ToteBags'
      sub = ''
    else:
      print("failed at row", row)
      count += 1
    categories[cat] = [main, sub]
    newRow = [row['fileName'].strip(), main, sub, row['Title'].strip(), row['Dimension'].strip(), row['Media'].strip()]
    print((", ").join(newRow))
  print(count)