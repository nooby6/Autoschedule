# autoschedule_app/routes.py

from flask import render_template, redirect, url_for, request, flash

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # Here you would add your logic to validate the user credentials
        # For simplicity, we're just printing the credentials
        print(f'Username: {username}, Password: {password}')
        # Redirect to home after login
        return redirect(url_for('index'))
    return render_template('login.html')
