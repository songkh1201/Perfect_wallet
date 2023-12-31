async function RedPen1(dateMax, dateMin) {
    let dt;
    await fetch(`https://inuesc.azurewebsites.net/Receipt/date?dateMax=${dateMax}&dateMin=${dateMin}`, {
        method: 'GET'
    }).then((response) => {
        if (response.ok) {
            return response.json();
        }
    }).then(async (data) => {
        let array = [];

        for (let i in data) {
            array.push({ReceiptId: data[i].ReceiptID});
        }
        dt = await RedPen2(array);
    });
    return dt;
}
async function RedPen2(ReceiptArray) {
    let dt;
    let PercentData = [];
    await fetch('https://inuesc.azurewebsites.net/Receipt/RedPen', {
        'method': 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(ReceiptArray) //오브젝트 타입 예시 [{ReceiptId : "23942382947"}, {ReceiptId : "34023498"}]
    }).then((res) => {
        return res.json()
    }).then((data) => {

        for (let i in data.Items) {
            PercentData.push({
                category: data.Items[i].category,
                percent: calculatePercentage(data.Items[i].cost, data.totalCost)
            });

        }
        console.log(PercentData);
        dt = PercentData;
    });
    return dt;
}
function calculatePercentage(part, whole) {
      return (part / whole) * 100;
}


