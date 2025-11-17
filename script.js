let order = [];
let total = 0;

function addItem(name, price) {
    order.push({ item:name, cost:price });
    total += price;
    displayOrder();
}

function displayOrder() {
    let html = "";
    order.forEach((o, index) => {
        html += (index+1)+". "+o.item+" - ₹"+o.cost+"<br>";
    });

    document.getElementById("orderList").innerHTML = html;
    document.getElementById("totalAmount").innerHTML = total;
}

function placeOrder() {
    let name = document.getElementById("customerName").value;
    let className = document.getElementById("customerClass").value;

    if(name.trim() === "") {
        alert("Please enter your Name!");
        return;
    }

    if(order.length === 0) {
        alert("Please add at least one food item!");
        return;
    }

    let previous = JSON.parse(localStorage.getItem("allOrders")) || [];

    previous.push({
        name: name,
        className: className,
        items: order,
        total: total,
        time: new Date().toLocaleString()
    });

    localStorage.setItem("allOrders", JSON.stringify(previous));

    alert("Order placed!");

    order = [];
    total = 0;

    document.getElementById("customerName").value = "";
    document.getElementById("customerClass").value = "";
    displayOrder();
}
