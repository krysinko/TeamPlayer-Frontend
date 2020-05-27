import { Injectable } from '@angular/core';
import { Meeting } from '../../models/meeting';
import { Observable } from 'rxjs';
import { API_URL, meetingsApiPath, meetingsByUserPath,  } from './endpoints';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../models/task';

@Injectable({
    providedIn: 'root'
})
export class MeetingsApiService {

    constructor(private http: HttpClient) {
    }

    getMeetingsByUser(id: number): Observable<Meeting[]> {
        return this.http.get<Meeting[]>(API_URL + meetingsByUserPath + id);
    }

    getMeetingById(id: number): Observable<Meeting> {
        return this.http.get<Meeting>(API_URL + meetingsApiPath + id);
    }

    postNewMeeting(meeting: Meeting) {
        return this.http.post<Meeting>(API_URL + meetingsApiPath, meeting);
    }

    updateMeeting(meeting: Meeting) {
        return this.http.put<Meeting>(API_URL + meetingsApiPath + meeting.id, meeting);
    }
}
