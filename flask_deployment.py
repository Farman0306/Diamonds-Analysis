# app.py
from flask import Flask, jsonify, render_template
import pandas as pd
import sqlite3

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project_diamond.db'

# Define API endpoint to retrieve data from the database


@app.route('/api/scatterClarityLab', methods=['GET'])
def get_scatterClarityLab_data():
    try:
        conn = sqlite3.connect('project_diamond.db')
        cursor = conn.cursor()
        query = 'SELECT * FROM all_diamonds WHERE type="lab"'
        diamonds = cursor.execute(query).fetchall()
        conn.close()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch data from the database'})

    scatterClarityLab_data = [
        {'clarity': item[3], 'ppc': item[7]} for item in diamonds]
    return jsonify(scatterClarityLab_data)


@app.route('/api/scatterCutLab', methods=['GET'])
def get_scatterCutLab_data():
    try:
        conn = sqlite3.connect('project_diamond.db')
        cursor = conn.cursor()
        query = 'SELECT * FROM all_diamonds WHERE type="lab"'
        diamonds = cursor.execute(query).fetchall()
        conn.close()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch data from the database'})

    scatterCutLab_data = [{'cut': item[1], 'ppc': item[7]}
                          for item in diamonds]
    return jsonify(scatterCutLab_data)


@app.route('/api/scatterColorLab', methods=['GET'])
def get_scatterColorLab_data():
    try:
        conn = sqlite3.connect('project_diamond.db')
        cursor = conn.cursor()
        query = 'SELECT * FROM all_diamonds WHERE type="lab"'
        diamonds = cursor.execute(query).fetchall()
        conn.close()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch data from the database'})

    scatterColorLab_data = [{'color': item[2], 'ppc': item[7]}
                            for item in diamonds]
    return jsonify(scatterColorLab_data)

# MINED TYPE


@app.route('/api/scatterClarityMined', methods=['GET'])
def get_scatterClarityMined_data():
    try:
        conn = sqlite3.connect('project_diamond.db')
        cursor = conn.cursor()
        query = 'SELECT * FROM all_diamonds WHERE type="mined"'
        diamonds = cursor.execute(query).fetchall()
        conn.close()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch data from the database'})

    scatterClarityMined_data = [
        {'clarity': item[3], 'ppc': item[7]} for item in diamonds]
    return jsonify(scatterClarityMined_data)


@app.route('/api/scatterCutMined', methods=['GET'])
def get_scatterCutMined_data():
    try:
        conn = sqlite3.connect('project_diamond.db')
        cursor = conn.cursor()
        query = 'SELECT * FROM all_diamonds WHERE type="mined"'
        diamonds = cursor.execute(query).fetchall()
        conn.close()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch data from the database'})

    scatterCutMined_data = [{'cut': item[1], 'ppc': item[7]}
                            for item in diamonds]
    return jsonify(scatterCutMined_data)


@app.route('/api/scatterColorMined', methods=['GET'])
def get_scatterColorMined_data():
    try:
        conn = sqlite3.connect('project_diamond.db')
        cursor = conn.cursor()
        query = 'SELECT * FROM all_diamonds WHERE type="mined"'
        diamonds = cursor.execute(query).fetchall()
        conn.close()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch data from the database'})

    scatterColorMined_data = [
        {'color': item[2], 'ppc': item[7]} for item in diamonds]
    return jsonify(scatterColorMined_data)

# Mines


# Assume you have the necessary imports and setup for the Flask app

@app.route('/api/mines_map', methods=['GET'])
def get_mines_map_data():
    try:
        conn = sqlite3.connect('project_diamond.db')
        cursor = conn.cursor()
        query = 'SELECT Country, LAT, LONG FROM mines_map'
        cursor.execute(query)
        data = cursor.fetchall()
        conn.close()

        mines_map = []
        for row in data:
            mines_map.append({
                'Country': row[0],
                'LAT': row[1],
                'LONG': row[2]
            })

    except Exception as e:
        return jsonify({'error': 'Failed to fetch mines_map data from the database'})

    return jsonify(mines_map)




# Ranking


@app.route('/api/ranking', methods=['GET'])
def get_ranking_data():
    try:
        conn = sqlite3.connect('project_diamond.db')
        cursor = conn.cursor()

        # Select specific columns from lab_diamond_ranking table
        query_lab = 'SELECT Country, "Production 2020", "Share in %" FROM lab_diamond_ranking'
        lab_data = cursor.execute(query_lab).fetchall()

        # Select specific columns from natural_diamond_ranking table
        query_natural = 'SELECT Country, "Production 2020", "Share in %" FROM natural_diamond_ranking'
        natural_data = cursor.execute(query_natural).fetchall()

        conn.close()
    except Exception as e:
        return jsonify({'error': 'Failed to fetch ranking data from the database'})

    lab_data_bar = [{'Country': item[0], 'Production 2020': item[1]}
                    for item in lab_data]
    natural_data_bar = [{'Country': item[0],
                         'Production 2020': item[1]} for item in natural_data]

    lab_data_pie = [{'Country': item[0], 'Share in %': item[2]}
                    for item in lab_data]
    natural_data_pie = [{'Country': item[0], 'Share in %': item[2]}
                        for item in natural_data]

    return jsonify({
        'lab_data_bar': lab_data_bar,
        'natural_data_bar': natural_data_bar,
        'lab_data_pie': lab_data_pie,
        'natural_data_pie': natural_data_pie
    })


@app.route('/')
def index():
    return render_template('HTML.html')


if __name__ == '__main__':
    app.run(debug=True)
