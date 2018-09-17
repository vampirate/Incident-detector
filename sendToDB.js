function sendToDatabase(postcode, suburb, weather, color, device) {
    let db = new sqlite3.Database('./database.db');

    let sql = `INSERT INTO pubnubdb (postcode, suburb, weather, color, device)
            VALUES (2000, Sydney, nice, Orange, Apple);`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row);
        });
    });

    // close the database connection
    db.close();
}