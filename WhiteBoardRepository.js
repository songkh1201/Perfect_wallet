const DatabaseConnecter = require("./DatabaseConnecter");
const sqlite = require('sqlite3').verbose();
class WhiteBoardRepository {
    db;
    constructor() {
        this.db = new DatabaseConnecter();
    }
    getInstance() {
        return this.db;
    }
    Insert(data) {
        // data = [{item : '라면', qu : 1, cost : 3500}]
        for(let i in data) {
            this.db.run(`INSERT INTO whiteBoard VALUES ()`, (err) => {
                if(err)
                    console.error(err.message);
                console.log(`inserted data ${data[i]}`);
            });
        }
    }
    async ReadAll(query,db){
        return new Promise(function(resolve,reject){
            db.all(query, function(err,rows){
                if(err){
                    return reject(err);
                }
                resolve(rows);
            });
        });
    }
    async getItemsByDate(date) {
        let data = await this.ReadAll(`select * from whiteBoard where date = '${date}'`,this.db);
        return data;
    }

}module.exports = WhiteBoardRepository;