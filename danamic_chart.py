import pandas as pd
import plotly.express as px

# Wczytanie danych z pliku XLSX
# data = pd.read_excel('gliwice.xlsx')
sheet_name = "proste"
df = pd.read_excel('gliwice.xlsx', sheet_name)

# Tworzenie wykresu liniowego za pomocą Plotly Express
fig = px.bar(df, x='Grupa wieku', y='Ogółem', title='Liczba Ludzi Ogółem na Przestrzeni Lat')
fig.show()