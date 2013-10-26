'''
Created on Oct 25, 2013

@author: George Lifchits
'''

from flask import Flask
from flask import render_template, request
import json
from ituneslib import iTunes

app = Flask(__name__)
app.debug = True
log = app.logger

SUCC = 'success'


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/toggle', methods = ['POST'])
def toggle():
    itunes = iTunes()
    itunes.toggle()
    return SUCC


@app.route('/next', methods = ['POST'])
def next_song():
    itunes = iTunes()
    itunes.next()
    return SUCC


@app.route('/prev', methods = ['POST'])
def prev_song():
    itunes = iTunes()
    itunes.prev()
    return SUCC


@app.route('/get_song')
def get_song():
    itunes = iTunes()
    info = itunes.current_track()
    return json.dumps(info)


@app.route('/set_rating', methods = ['POST'])
def set_rating():
    rating = request.values.get('rating')
    log.info ('rating is %s' % rating)
    itunes = iTunes()
    itunes.set_rating(rating)
    return str(request.values)



if __name__ == "__main__":
    app.run(host = '0.0.0.0')
