import pandas as pd
import plotly.express as px

data = "gliwice.xlsx"
dane = pd.read_excel(data)

print(dane.head())