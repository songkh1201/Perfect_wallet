const DatabaseConnecter = require("./DatabaseConnecter");
const sqlite = require('sqlite3').verbose();
class ReceiptItemRepository {
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
            this.db.run(`INSERT INTO Item (item, qu, cost, ReceiptID, category) VALUES ('${data[i].objectName}', ${data[i].qu}, ${data[i].price}, '${data[i].ReceiptID}', '${data[i].category}')`, (err) => {
                if(err)
                    console.error(err.message);
                console.log(`inserted data ${data[i]}`);
            });
        }
    }
    async deleteAll() {
        this.db.run('delete from Item', (err) => {
            if(err)
                console.error(`delete failed ${err.message}`);
        });
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
    async getItemsByReceiptID(receiptID) {
        let data = await this.ReadAll(`select * from Item where ReceiptID = '${receiptID}'`,this.db);
        return data;
    }

}module.exports = ReceiptItemRepository;