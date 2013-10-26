'''
Created on Oct 25, 2013

@author: George Lifchits
'''

import sys
import win32com.client, pythoncom

def connect_to_itunes():
    try:
        pythoncom.CoInitialize()
        iTunes = win32com.client.gencache.EnsureDispatch('iTunes.Application')
        return iTunes
    except:
        raise Exception
        sys.exit()


class iTunes:

    def __init__(self):
        self.itunes = connect_to_itunes()

    def pause(self):
        return self.itunes.Pause()

    def play(self):
        return self.itunes.Resume()

    def toggle(self):
        return self.itunes.PlayPause()

    def prev(self):
        return self.itunes.PreviousTrack()

    def next(self):
        return self.itunes.NextTrack()

    def current_track(self):
        track = self.itunes.CurrentTrack
        info = {
            'name': track.Name,
            'artist': track.Artist,
            'album': track.Album
        }
        return info



if __name__ == "__main__":
    it = iTunes()
    it.toggle()
    print it.current_track()
