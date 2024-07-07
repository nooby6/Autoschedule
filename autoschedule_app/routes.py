from flask import render_template, redirect, url_for, request, flash
from autoschedule_app import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    # Handle login logic here
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    # Handle signup logic here
    return render_template('signup.html')
