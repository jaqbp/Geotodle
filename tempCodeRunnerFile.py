import pandas as pd
import plotly.express as px

# Wczytanie danych z pliku XLSX
data = pd.read_excel('gliwice.xlsx')

# Tworzenie wykresu liniowego za pomocą Plotly Express
fig = px.bar(data, x='2022*', y='Grupa wieku   Age group', title='Liczba Ludzi Ogółem na Przestrzeni Lat')
fig.show()