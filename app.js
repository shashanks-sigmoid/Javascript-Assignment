// fetch data from api function definition
const fetchData = async () => {
    try {
        res = await fetch('https://randomuser.me/api/?results=5000', {
            method: "GET"
        });

        if (res.ok) {
            let json_response = await res.json()
            //console.log(json_response?.results?.slice(0, 20))
            let data = json_response?.results
            //console.log(data)
            return data
        }
    }
    catch (e) {
        console.log(e.message)
        return new Error(`Data could not be fetch due to ${e.message} `)
    }
}


// render list - function definition
const renderData = async () => {
    let tableContent = await fetchData()
    tableContent = tableContent?.slice(0, 20)
    let column = ["name", "gender", "country", "email", "dob", "age", "button"];
    const tableBody = document.getElementById('t-body')
    tableContent?.forEach((val, index) => {
        let row = document.createElement("tr");
        for (let col of column) {
            let td = document.createElement("td");
            if (col === "name") {
                td.textContent = val["name"]["first"];
            } else if (col === "dob") {
                td.textContent = new Date(val[col]["date"]).toJSON().slice(0, 10);
            } else if (col === "age") {
                td.textContent = val["dob"][col];
            } else if (col === "country") {
                td.textContent = val["location"][col];
            } else if (col === "button") {
                let button = document.createElement("button");
                button.textContent = "X";
                button.setAttribute("type", "submit");
                button.setAttribute("onclick", "deleteRow(this)");
                button.setAttribute("class", "delete-btn");
                td.appendChild(button);
            } else {
                td.textContent = val[col];
            }
            row.append(td);
        }
        tableBody.appendChild(row);
        let buffer = document.getElementById("buffer");
        buffer.setAttribute('class', 'buffer-done')
    })
}

// render list - function calling
renderData();

// delete row - function definition
const deleteRow = (e) => {
    //console.log(e)
    let columnPressed = e.parentNode;
    let targetRow = columnPressed.parentNode;
    targetRow.parentNode.removeChild(targetRow);
}

// submit eventListener
const formSubmit = document.forms['form']
//console.log(formSubmit)
formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    //console.log(formData)
    const tableBody = document.getElementById('t-body')
    let tr = document.createElement("tr");
    //console.log(Object.values(formData));
    Object.values(formData).forEach((val, index) => {
        let td = document.createElement("td");
        td.textContent = val;
        tr.appendChild(td);
    });
    let td = document.createElement("td");
    let button = document.createElement("button");
    button.textContent = "X";
    button.setAttribute("type", "submit");
    button.setAttribute("onclick", "deleteRow(this)");
    button.setAttribute("class", "delete-btn");
    td.appendChild(button);
    tr.appendChild(td);
    tableBody.appendChild(tr);
    formSubmit.reset();
})

