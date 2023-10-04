require('dotenv').config();

export const API_PORT = process.env.API_PORT || ''
export const API_HOST = process.env.API_HOST || ''

export const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || ''
export const ACCESS_SECRET = process.env.ACCESS_SECRET || ''

export const GOOGLE_CALENDAR_CLIENT_ID = process.env.GOOGLE_CALENDAR_CLIENT_ID || ''
export const GOOGLE_CALENDAR_CLIENT_SECRET = process.env.GOOGLE_CALENDAR_CLIENT_SECRET || ''
export const GOOGLE_CALENDAR_REDIRECT_URL = process.env.GOOGLE_CALENDAR_REDIRECT_URL || ''
export const DEFAULT_CALENDAR_NAME = process.env.DEFAULT_CALENDAR_NAME || ''