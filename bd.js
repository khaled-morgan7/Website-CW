const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('travel.db')

// NOT NULL MEANS CANNOT BE EMPTY
// UNIQUE MEANS MUST BE NAMED ONCE
// INT (IS ADMIN) => BOOLEAN, INTEGER, FLOAT, DOUBLE, OR NOT YT DEFINED

const createUserTable = `
    CREATE TABLE IF NOT EXISTS USER (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        NAME TEXT NOT NULL,
        EMAIL TEXT NOT NULL UNIQUE,
        PASS TEXT NOT NULL,
        ISADMIN INT
    );`;

// Create TICKET table
const createTicketTable = `
   CREATE TABLE IF NOT EXISTS TICKET (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      FROM TEXT NOT NULL,
      DEST TEXT NOT NULL,
      DATE TEXT NOT NULL,
      QUANTITY INTEGER NOT NULL,
      PRICE INTGER NOT NULL
    );`;

// Create BOOKING table
const createBookingTable = `
   CREATE TABLE IF NOT EXISTS BOOKINGS (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    USER_ID INTEGER NOT NULL,
    TICKET_ID INTEGER NOT NULL,
    FOREIGN KEY (USER_ID) REFERENCES USER (ID),
    FOREIGN KEY (TICKET_ID) REFERENCES TICKET (ID)
    );`;

    // Create Feedback Table 
const createFeedbackTable = `
    CREATE TABLE IF NOT EXISTS Feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users (id)
    );`;

// exports data of db, and tables all alone
module.exports = { db, createUserTable, createBookingTable, createTicketTable, createFeedbackTable }


















