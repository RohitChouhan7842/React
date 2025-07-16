document.addEventListener("DOMContentLoaded", function(){
  const employeeForm = document.getElementById("employeeForm");
  const employeeName = document.getElementById("employeeName");
  const employeeTitle = document.getElementById("employeeTitle");
    const employeeList = document.getElementById("employeeList");

    function loadEmployees(){
        employeeList.innerHTML = "";
        const employees = JSON.parse(localStorage.getItem("employees")) || [];
        employees.forEach((employee, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${employee.name}</td>
                <td>${employee.title}</td>
                <td>
                    <button onclick="editEmployee(${index})">Edit</button>
                    <button onclick="deleteEmployee(${index})">Delete</button>
                </td>
            `;
            employeeList.appendChild(row);
        });
    }
  employeeForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const newEmployeeName = employeeName.value.trim();
    const newEmployeeTitle = employeeTitle.value.trim();
    if (newEmployeeName !=="" && newEmployeeTitle !== "") {
      const employees = JSON.parse(localStorage.getItem("employees")) || [];
      employees.push({ name: newEmployeeName, title: newEmployeeTitle });
      localStorage.setItem("employees", JSON.stringify(employees));
      employeeName.value = "";
      employeeTitle.value = "";
      loadEmployees();
    }

  });

  window.editEmployee = function(index){
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employee = employees[index];
    const updatedName = prompt("Edit Employee Name:", employee.name);
    const updatedTitle = prompt("Edit Employee Title:", employee.title);
    if (updatedName !== null && updatedTitle !== null) {
      employees.name = updatedName;
        employees.title = updatedTitle;
        localStorage.setItem("employees", JSON.stringify(employees));
        loadEmployees();
    }
  };
  window.deleteEmployee = function(index) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    employees.splice(index, 1);
    localStorage.setItem("employees", JSON.stringify(employees));
    loadEmployees();
  };
    loadEmployees();

})