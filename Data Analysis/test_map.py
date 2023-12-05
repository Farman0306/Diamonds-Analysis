import pandas as pd
import plotly.express as px
import dash
import dash_core_components as dcc
import dash_html_components as html

data = pd.read_excel('mines_worldwide.xlsx')
df = data.copy()

# Create the Dash app
app = dash.Dash(__name__)

# Create the scatter_geo plot figure
fig = px.scatter_geo(df,
                     lat='LAT',
                     lon='LONG',
                     color="COUNTRY",
                     hover_name="COUNTRY"
                     )

# Set the initial layout
app.layout = html.Div([
    html.H1("Interactive Geo Visualization", style={'text-align': 'center'}),
    html.Div([
        dcc.Dropdown(
            id='country-dropdown',
            options=[{'label': country, 'value': country} for country in df['COUNTRY'].unique()],
            multi=True,  # Allow multiple selections in the dropdown
            style={'width': '200px'}  # Set the width of the dropdown
        )
    ], style={'position': 'relative', 'margin': '0 auto', 'text-align': 'center'}),  # Center the dropdown

    dcc.Graph(
        id='geo-graph',
        figure=fig,
        style={'backgroundColor': 'lightgray'}  # Set the background color of the graph
    )
])

# Define the callback function to update the plot based on the dropdown selection
@app.callback(
    dash.dependencies.Output('geo-graph', 'figure'),
    [dash.dependencies.Input('country-dropdown', 'value')]
)
def update_graph(selected_countries):
    if not selected_countries:
        filtered_df = df
    else:
        filtered_df = df[df['COUNTRY'].isin(selected_countries)]
    updated_fig = px.scatter_geo(filtered_df,
                                 lat='LAT',
                                 lon='LONG',
                                 color="COUNTRY",
                                 hover_name="COUNTRY"
                                 )
    return updated_fig.update_layout(
        plot_bgcolor='white',  # Set the plot background color
        paper_bgcolor='lightgray'  # Set the paper background color
    )

# Run the app
if __name__ == '__main__':
    app.run_server(debug=True, port=8065)
