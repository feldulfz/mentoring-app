import { Injectable } from '@angular/core';

declare const gapi: any;
declare const google: any;

@Injectable({ providedIn: 'root' })
export class GoogleCalendarService {
    // Replace these with your actual keys from Google Cloud Console
    private CLIENT_ID = ''; // use some server side code to hide this
    private API_KEY = ''; // use some server side code to hide this
    private DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';

    /** Updated SCOPES for both read and write access */
    private SCOPES = 'https://www.googleapis.com/auth/calendar';

    private tokenClient: any;
    private gapiInited = false;
    private gisInited = false;

    constructor() {
        this.initialize();
    }

    // Initialize GAPI and GIS
    private async initialize() {
        await this.loadGapi();
        await this.loadGis();
    }

    // Load Google API client
    private loadGapi(): Promise<void> {
        return new Promise((resolve) => {
            const checkGapi = () => {
                if (typeof gapi !== 'undefined') {
                    gapi.load('client', async () => {
                        await gapi.client.init({
                            apiKey: this.API_KEY,
                            discoveryDocs: [this.DISCOVERY_DOC],
                        });
                        this.gapiInited = true;
                        resolve();
                    });
                } else {
                    setTimeout(checkGapi, 100);
                }
            };
            checkGapi();
        });
    }

    // Load Google Identity Services
    private loadGis(): Promise<void> {
        return new Promise((resolve) => {
            const checkGis = () => {
                if (typeof google !== 'undefined' && google.accounts) {
                    this.tokenClient = google.accounts.oauth2.initTokenClient({
                        client_id: this.CLIENT_ID,
                        scope: this.SCOPES,
                        callback: '', // defined later
                    });
                    this.gisInited = true;
                    resolve();
                } else {
                    setTimeout(checkGis, 100);
                }
            };
            checkGis();
        });
    }

    // Sign in to Google and request access token
    async signIn(): Promise<void> {
        if (!this.gapiInited || !this.gisInited) {
            await this.initialize();
        }

        return new Promise((resolve, reject) => {
            this.tokenClient.callback = async (resp: any) => {
                if (resp.error) {
                    reject(resp.error);
                } else {
                    resolve();
                }
            };

            const token = gapi.client.getToken();
            if (token === null) {
                this.tokenClient.requestAccessToken({ prompt: 'consent' });
            } else {
                this.tokenClient.requestAccessToken({ prompt: '' });
            }
        });
    }

    // Sign out and revoke token
    signOut() {
        const token = gapi.client.getToken();
        if (token) {
            google.accounts.oauth2.revoke(token.access_token);
            gapi.client.setToken('');
        }
    }

    // List events from Google Calendar
    async listUpcomingEvents() {
        const response = await gapi.client.calendar.events.list({
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
        });
        return response.result.items || [];
    }

    // Create a Google Calendar event (for Firestore session sync)
    async createEvent(session: {title: string; description?: string; startAt: string; endAt: string; menteeEmail?: string;}) {
        const event = {
            summary: session.title || 'Mentorship Session',
            description: session.description || '',
            start: {
                dateTime: new Date(session.startAt).toISOString(),
                timeZone: 'Asia/Manila',
            },
            end: {
                dateTime: new Date(session.endAt).toISOString(),
                timeZone: 'Asia/Manila',
            },
            attendees: session.menteeEmail ? [{ email: session.menteeEmail }] : [],
            reminders: { useDefault: true },
        };

        try {
            const response = await gapi.client.calendar.events.insert({
                calendarId: 'primary',
                resource: event,
            });
            console.log('Event created:', response.result);
            return response.result;
        } catch (error) {
            console.error('Failed to create event:', error);
            throw error;
        }
    }
}
